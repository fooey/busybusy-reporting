import _ from 'lodash';
import { DateTime } from 'luxon';

export const JIT_INTERVAL = {
  day: `DAY`,
  month: `MONTH`,
  year: `YEAR`,
  overtimePeriod: `OVERTIME_PERIOD`,
  payPeriod: `PAY_PERIOD`,
  custom: `CUSTOM`,
};

export interface IJITDataRow {
  memberId?: string | null;
  projectId?: string | null;
  costCodeId?: string | null;
  equipmentId?: string | null;
}
export type IJITData = IJITDataRow[];

export interface IJITResult {
  data: {
    costCodeTimeMetrics?: IJITData;
    equipmentTimeMetrics?: IJITData;
    memberCostCodeTimeMetrics?: IJITData;
    memberEquipmentTimeMetrics?: IJITData;
    memberProjectCostCodeEquipmentTimeMetrics?: IJITData;
    memberProjectTimeMetrics?: IJITData;
    memberTimeMetrics?: IJITData;
    projectTimeMetrics?: IJITData;
  };
}

const commonAttributes = [
  `endDate`,
  `startDate`,
  `regularWorkingCents`,
  `regularWorkingSeconds`,
  `doubletimeBreakCents`,
  `doubletimeBreakSeconds`,
  `doubletimeWorkingCents`,
  `doubletimeWorkingSeconds`,
  `overburdenBreakCents`,
  `overburdenWorkingCents`,
  `overtimeBreakCents`,
  `overtimeBreakSeconds`,
  `overtimeWorkingCents`,
  `overtimeWorkingSeconds`,
  `paidTimeOffCents`,
  `paidTimeOffSeconds`,
  `regularBreakCents`,
  `regularBreakSeconds`,
  `unpaidBreakSeconds`,
  `unpaidTimeOffSeconds`,
];

export const jitMetrics = {
  costCodeTime: { queryEndpoint: 'costCodeTimeMetrics', fields: [`costCodeId`, ...commonAttributes] },
  equipmentTime: { queryEndpoint: 'equipmentTimeMetrics', fields: [`equipmentId`, ...commonAttributes] },
  memberCostCodeTime: { queryEndpoint: 'memberCostCodeTimeMetrics', fields: [`memberId`, `costCodeId`, ...commonAttributes] },
  memberEquipmentTime: {
    queryEndpoint: 'memberEquipmentTimeMetrics',
    fields: [`memberId`, `equipmentId`, ...commonAttributes],
  },
  memberProjectCostCodeEquipmentTime: {
    queryEndpoint: 'memberProjectCostCodeEquipmentTimeMetrics',
    fields: [`memberId`, `projectId`, `costCodeId`, `equipmentId`, ...commonAttributes],
  },
  memberProjectTime: {
    queryEndpoint: 'memberProjectTimeMetrics',
    fields: [`memberId`, `projectId`, ...commonAttributes],
  },
  memberTime: { queryEndpoint: 'memberTimeMetrics', fields: [`memberId`, ...commonAttributes] },
  projectTime: { queryEndpoint: 'projectTimeMetrics', fields: [`projectId`, ...commonAttributes] },
};

interface IJITFilter {
  startDate: DateTime;
  endDate: DateTime;
  interval: keyof typeof JIT_INTERVAL;
}

export const getJITQuery = (metricKey: keyof typeof jitMetrics, filters: IJITFilter): string => {
  const { queryEndpoint, fields } = jitMetrics[metricKey];
  const queryName = _.upperFirst(queryEndpoint);
  const { startDate, endDate, interval } = filters;

  const queryFilters = [
    `startDate: "${startDate.toISODate()}"`,
    `endDate: "${endDate.toISODate()}"`,
    `interval: ${JIT_INTERVAL[interval]}`,
  ];

  const query = `query ${queryName} { ${queryEndpoint}(${queryFilters}) { ${fields.join(' ')} }}`;

  return query;
};
