import { DateTime } from 'luxon';
import { NextApiHandler, NextApiResponse } from 'next';
import { queryJit } from '~/lib/api';
import { getJITQuery, IJITResult, jitMetrics } from '~/lib/api/queries';

export interface IAPIDataRequestProps {
  metric: keyof typeof jitMetrics;
  start: string;
  end: string;
}

type IResultKey = keyof IJITResult['data'];

const handler: NextApiHandler<string> = async (req, res) => {
  const props: IAPIDataRequestProps = Object.assign({}, req.body, req.query);
  const { metric, start, end } = props;

  const startDate = DateTime.fromISO(start);
  const endDate = DateTime.fromISO(end);

  if (!metric) {
    return invalidRequest(res, `metric is required`);
  } else if (!Object.keys(jitMetrics).includes(metric)) {
    return invalidRequest(res, `metric is not supported: ${props.metric} (${jitMetrics}.join(','))`);
  } else {
    const query = getJITQuery(metric, { startDate, endDate, interval: 'month' });
    const jitResponse = await queryJit(query);
    const resultKey = `${metric}Metrics` as IResultKey;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const jitData = jitResponse.data[resultKey]!;

    return res.json(JSON.stringify(jitData));
  }
};

function invalidRequest(res: NextApiResponse, text?: string) {
  const statusText = `Invalid Request${text ? `: ${text}` : ''}`;
  const jsonResponse = { statusCode: 400, statusText };

  return res.status(400).json(JSON.stringify(jsonResponse));
}

export default handler;
