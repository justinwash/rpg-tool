export const parseUrlQuery = (urlQuery: string) => {
  var query = urlQuery.substr(1);
  var result: any = {};
  query.split('&').forEach(function (part) {
    var item = part.split('=');
    result[item[0]] = decodeURIComponent(item[1]);
  });
  return result;
};
