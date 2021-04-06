import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import React, { useState } from 'react';
import Icon from '~/components/icons/Icon';
import {
  PageHeaderContainer,
  PageHeaderSubTitle,
  PageHeaderSubTitlesContainer,
  PageHeaderTitle
} from '~/components/layout/PageHeader';
import { ICostCode, IMember, IProject } from '~/lib/api';
import { IJITData, IJITDataRow, jitMetrics } from '~/lib/api/queries';
import { IHomePageProps } from '~/pages/home';

export const Home: React.FC<IHomePageProps> = (props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { data, objects } = props;

  function setUrlParam(k: string, v: string) {
    setLoading(true);
    const urlSearch = new URLSearchParams(location.search);
    urlSearch.set(k, v);

    return router.push({ search: urlSearch.toString() }).then(() => setLoading(false));
  }

  return (
    <>
      <Head>
        <title>busybusy reporting</title>
      </Head>

      {/* <PageHeaderContainer>
        <PageHeaderTitle>busybusy reporting</PageHeaderTitle>
        <PageHeaderSubTitlesContainer>
          <PageHeaderSubTitle>
            <Icon name="Annotation" className="w-5 h-5 text-gray-400 mr-1.5" />
            <span>What would you like to see?</span>
          </PageHeaderSubTitle>
        </PageHeaderSubTitlesContainer>
      </PageHeaderContainer> */}

      <ul>
        {Object.keys(jitMetrics).map((k) => (
          <li key={k}>
            <a onClick={() => setUrlParam('metric', k)}>{k}</a>
          </li>
        ))}
      </ul>

      <hr className="my-8" />

      <div className="my-4">{loading ? <h1>Loading</h1> : <RenderData data={data} objects={objects} />}</div>
    </>
  );
};

const RenderData: React.FC<{ data: IJITData; objects: IHomePageProps['objects'] }> = ({ data, objects }) => {
  const columnNames = Array.isArray(data) && data.length ? Object.keys(data[0]) : [];

  return (
    <div>
      {/* <pre>{JSON.stringify(query, null, '\t')}</pre> */}
      {/* <pre>
        {JSON.stringify(
          {
            results: data.length,
            member: objects.member ? Object.keys(objects.member).length : 0,
            project: objects.project ? Object.keys(objects.project).length : 0,
            costcode: objects.costcode ? Object.keys(objects.costcode).length : 0,
            equipment: objects.equipment ? Object.keys(objects.costcode).length : 0,
          },
          null,
          '\t'
        )}
      </pre> */}

      <table>
        <thead>
          <tr>
            {columnNames.map((col) => (
              <th key={col} className="px-1 py-4">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, ixRow) => {
            return (
              <tr key={ixRow}>
                {columnNames.map((col) => (
                  <RenderCell key={col} col={col} row={row} objects={objects} />
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

interface IObjects {
  member?: IMember[];
  project?: IProject[];
  costcode?: ICostCode[];
}

const RenderCell: React.FC<{ col: string; row: IJITDataRow; objects: IObjects }> = ({ row, col, objects }) => {
  const val = row[col];
  let output = val;

  if (col.match(/Id$/)) {
    const id = val ? val.toLowerCase() : 'n/a';
    const type = col.slice(0, col.length - 2);

    if (type === 'member' && objects.member) {
      const member = objects.member[id];

      if (member) {
        output = [member.first_name, member.last_name].join(' ');
      } else {
        output = 'member err';
      }
    } else if (type === 'project' && objects.project) {
      const project = objects.project[id];

      if (project) {
        output = project.title;
      } else {
        output = 'project err';
      }
    } else if (type === 'costCode' && objects.costcode) {
      const costcode = objects.costcode[id];

      if (costcode) {
        output = costcode.title;
      } else {
        output = 'costcode err';
      }
    }
  }

  return (
    <td key={col} className="px-1 py-4">
      {output}
    </td>
  );
};

export default Home;
