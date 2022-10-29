/// <reference types="Cypress" />
describe("Todos", () => {
  let completedTodosLength;
  it("Should fetch external Todos", async () => {
    const serverRes = await cy.request(
      `https://jsonplaceholder.typicode.com/todos?completed=true`
    );
    console.log("1 response from cypress =>>>>>>> ", serverRes);
    expect(serverRes.status).equal(200);
    completedTodosLength = serverRes.body.length;
    console.log("completedTodosLength ;;; ", completedTodosLength);
  });

  it("Cached API Todos length should be the same as the fetched Todos length", async () => {
    const response = await cy.request(`http://localhost:3000/todos/true`);
    console.log("2 response from cypress =>>>>>>> ", response.body);
    // expect(response.fromCache).equal(false);
    expect(response.body.data.length).equal(completedTodosLength);
  });
});
