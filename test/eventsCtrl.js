// /* eslint-disable no-undef */
// process.env.NODE_ENV = "test";
// const chai = require("chai");
// const chaiHttp = require("chai-http");
// const expect = chai.expect;
// const Events = require("../api/database/eventsDb");
// const server = require("../server");

// chai.use(chaiHttp);

// describe("Events integration test route", () => {
//   describe("/api/events GET", () => {
//     it("it should GET all the events and return status 200", done => {
//       chai
//         .request(server)
//         .get("/api/events")
//         .end((err, res) => {
//           expect(res).to.have.status(200);
//           done();
//         });
//     });
//   });

//   describe("/api/events/:id GET", () => {
//     it("it should GET one event and return status 200", done => {
//       chai
//         .request(server)
//         .get("/api/events/event/5c8e9ec9d5ac1621306c5775")
//         .end((err, res) => {
//           expect(res).to.have.status(200);
//           done();
//         });
//     });
//   });

//   describe("/api/events/:id GET", () => {
//     it("it should GET tickets quantity and return status 200", done => {
//       chai
//         .request(server)
//         .get("/api/events/event/5c8e9ec9d5ac1621306c5775/tickets")
//         .end((err, res) => {
//           expect(res).to.have.status(200);
//           done();
//         });
//     });
//   });

// });
