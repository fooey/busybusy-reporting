import _ from 'lodash';
import pLimit from 'p-limit';
import qs from 'querystring';
import { IJITData, IJITResult } from './queries';

// const aggThrottle = pLimit(1);
const joinThrottle = pLimit(8);

// TLN
// const KEY_AUTHORIZATION=`eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJidXN5YnVzeS12My1tZW1iZXItc2Vzc2lvbiIsImlhdCI6MTYwNDMzNjc3OSwic3ViIjoiNTc1Mjk1MCJ9.i6yZlmHit8nOIy-kw4pce82uneJpOkAs2N8Sz94nu6w`;

// CE
// const KEY_AUTHORIZATION = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJidXN5YnVzeS12My1tZW1iZXItc2Vzc2lvbiIsImlhdCI6MTYwNDQyNzI2Mywic3ViIjoiNTc1NTQzOSJ9.ckoIjU9Ys9iUXRhaAR0f87BXy0BBRjL2Dv960rlfwUk`;

// beta
const KEY_AUTHORIZATION = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJidXN5YnVzeS12My1tZW1iZXItc2Vzc2lvbiIsImlhdCI6MTYxNjcxMjQyMywic3ViIjoiNDQwNjY3In0.d8dqYd0Y6bfFg08l4EKdvJnf0dQffxK8VQiVcEou32o`;

export interface IApiResponse<T> {
  success: true;
  code: [];
  data: T[];
  total_rows: number;
  returned_rows: number;
  next: string;
  supported: 200;
}

export interface IMember {
  id: number;
  first_name: string;
  last_name: string;
}

export interface IProject {
  id: number;
  title: string;
}

export interface ICostCode {
  id: number;
  title: string;
}

export interface IEquipment {
  id: number;
}

const jitGraphQLEndpoint = `https://jit-beta.busybusy.io/`;
const apiEndpoint = `https://api-beta.busybusy.io`;

const memberEndpoint = new URL(`${apiEndpoint}/member`);
const projectEndpoint = new URL(`${apiEndpoint}/project`);
const costcodeEndpoint = new URL(`${apiEndpoint}/cost-code`);
const equipmentEndpoint = new URL(`${apiEndpoint}/equipment`);

const endpoints = {
  member: memberEndpoint,
  project: projectEndpoint,
  costcode: costcodeEndpoint,
  equipment: equipmentEndpoint,
};

export type IEndpointKeys = keyof typeof endpoints;

interface IUrlParams {
  page?: number;
  page_size?: number;
  [k: string]: string | number | undefined | null;
}

export async function fetchApi<T>(urlKey: IEndpointKeys, urlParams: IUrlParams): Promise<IApiResponse<T>> {
  const url = endpoints[urlKey];
  const headers = { 'key-authorization': KEY_AUTHORIZATION };

  const searchParams = Object.assign(
    {},
    {
      _version: '3.2',
    },
    urlParams
  );

  url.search = qs.stringify(searchParams).toString();

  const fetchUrl = url.toString();
  console.log(`🚀 ~ file: api.ts ~ line 72 ~ fetchApi ~ fetchUrl`, fetchUrl);

  return fetch(fetchUrl, { headers }).then((response) => response.json());
}

// const pagingThrottle = pLimit(1);

// export async function fetchAllApi<T>(urlKey: IEndpointKeys, inUrlParams: IUrlParams): Promise<IApiResponse<T>> {
//   const { page_size, ...additionalParams } = inUrlParams;
//   const pageSize = page_size ? page_size : 250;
//   const dataResults: T[][] = [];

//   const urlParams = Object.assign({}, additionalParams, { page: 1, page_size: pageSize });

//   const initialResponse = await fetchApi<T>(urlKey, urlParams);
//   const { data, ...responseMeta } = initialResponse;
//   if (data) {
//     dataResults.push(data);
//   }

//   const totalPages = Math.ceil(responseMeta.total_rows / pageSize);
//   const pagesToDo = totalPages - 1;

//   const paging = await Promise.all(
//     Array.from({ length: pagesToDo }).map((__, i) => {
//       const page = i + 2; // skip 0 and 1
//       return pagingThrottle(() => fetchApi<T>(urlKey, { ...urlParams, page }));
//     })
//   );

//   paging.forEach(({ data }) => dataResults.push(data));
//   const combinedData: T[] = _.flatten(dataResults);

//   return { ...responseMeta, data: combinedData };
// }

export async function queryJit(query: string): Promise<IJITResult> {
  const headers = { 'key-authorization': KEY_AUTHORIZATION };
  const graphql = JSON.stringify({ query });

  return fetch(jitGraphQLEndpoint, { headers, method: 'POST', body: graphql }).then((response) => response.json());
}

export async function loadObjects(data: IJITData) {
  const memberIds: string[] = _.chain(data).map('memberId').uniq().compact().value();
  const costCodeIds: string[] = _.chain(data).map('costCodeId').uniq().compact().value();
  const projectIds: string[] = _.chain(data).map('projectId').uniq().compact().value();
  const equipmentIds: string[] = _.chain(data).map('equipmentId').uniq().compact().value();

  const [memberObjects, projectObjects, costcodeObjects, equipmentObjects] = await Promise.all([
    memberIds.length ? fetchApiItems<IMember>('member', memberIds) : null,
    projectIds.length ? fetchApiItems<IProject>('project', projectIds) : null,
    costCodeIds.length ? fetchApiItems<ICostCode>('costcode', costCodeIds) : null,
    equipmentIds.length ? fetchApiItems<IEquipment>('equipment', equipmentIds) : null,
  ]);

  const member = prune(memberObjects, ['id', 'first_name', 'last_name']);
  const project = prune(projectObjects, ['id', 'title']);
  const costcode = prune(costcodeObjects, ['id', 'title']);
  const equipment = prune(equipmentObjects, ['id']);

  return {
    member,
    project,
    costcode,
    equipment,
  };
}

export async function fetchApiItems<T>(type: IEndpointKeys, ids: string[]) {
  return Promise.all(
    ids.map((id) =>
      joinThrottle(() => fetchApi<T>(type, { id }))
    )
  ).then((responses) => responses.map(({ data }) => (Array.isArray(data) ? data.pop() : null)));
}

function prune(collection: any[] | null, props: string[]) {
  return collection
    ? _.keyBy(
        collection.map((o) => _.pick(o, props)),
        'id'
      )
    : null;
}
