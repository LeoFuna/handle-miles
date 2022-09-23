const fetcher = (...args) => fetch(...args)
  .then((res) => {
    if (!res.ok) {
      throw new Error(res);
    }

    return res.json();
  }).then((data) => data);

export default fetcher;
