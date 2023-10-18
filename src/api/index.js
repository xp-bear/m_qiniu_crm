// index.js
import http from "./request";

export function m_searchfile(params) {
  return http("/m_searchfile", {
    method: "get",
    params: params,
  });
}
