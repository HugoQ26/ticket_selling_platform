// const chai = require("chai");
// const expect = chai.expect;
// const proxyquire = require("proxyquire");
// const sinon = require("sinon");

// describe("Unit tests", () => {
//   let Events;
//   const debugStub = function() {
//     return sinon.stub();
//   };
//   //   let EventStub.getOneEvent = function() {return {
//   //       _id: 1234,
//   //       name: "Marcin",
//   //       date: new Date(),
//   //       ticketQty: 100,
//   //         ticketPrice: 45
//   //   }}
//   before(function() {
//     let Events = proxyquire("../api/controllers/eventsCtrl.js", {
//       "../database/eventsDb": EventStub
//     });
//   });

//   describe("Class Events", () => {
//     describe("Function getAllEvents()", () => {
//       it("it should be an array", done => {
//         let id = 1234;
//         Events.getOneEvent()
//           .then(result => {
//             expect(result).to.be.an("array");
//             done();
//           })
//           .catch(err => {
//             done(err);
//           });
//       });
//     });
//   });
// });
