export const toFloat = (value) => (value ? parseFloat(value.toFixed(3)) : 0);

export const toPercent = (value) => toFloat(toFloat(value) * 100);

export const callApi = async (api) => {
  const { data } = await fetch(`https://open-api.bser.io/v1/${api}`, {
    headers: { "x-api-key": "yTkphHVYxZ2sabcZpSEaNYRnbSfyHJxot7LdXJ70" },
  })
    .then((response) => response.json())
    .then((json) => json);
  return data;
};

export const corsApi = async (url) => {
  const data = await fetch(`https://corsanywhere12345.herokuapp.com/${url}`, {
    Accept: "*/*",
  }).then((response) => response.text());
  return data;
};
