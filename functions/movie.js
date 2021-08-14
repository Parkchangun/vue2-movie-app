exports.handler = async function (event) {
  // const payload = JSON.parse(event.body);
  // console.log(payload);
  return {
    statusCode: 200,
    body: JSON.stringify({
      name: 'Changeon',
      age: 85
    })
  }
}
