/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const expect = chai.expect;
const Events = require("../api/database/eventsDb");
const server = require("../server");

describe("Unit tests", () => {
  describe("Class Events", () => {
    describe("Function getAllEvents()", () => {
      it("it should be an array", done => {
        Events.getAllEvents().then(result => {
          expect(result).to.be.an("array");
          done();
        });
      });

      it("it should NOT be empty array", done => {
        Events.getAllEvents().then(result => {
          expect(result).to.be.an("array").that.is.not.empty;
          done();
        });
      });
    });

    describe("Function getOneEvent(_id)", () => {
      it("it should be an object", done => {
        Events.getOneEvent("5c8ea12ff3f2e42c44947f30").then(result => {
          expect(result).to.be.an("object");
          done();
        });
      });

      it("it should be an object that is not empty", done => {
        Events.getOneEvent("5c8ea12ff3f2e42c44947f30").then(result => {
          expect(result).to.be.an("object").that.is.not.empty;
          done();
        });
      });

      it("it should have property - name", done => {
        Events.getOneEvent("5c8ea12ff3f2e42c44947f30").then(result => {
          expect(result).to.have.property("name");
          done();
        });
      });
    });

    describe("Function getTicketsQty(_id)", () => {
      it("it should be an object", done => {
        Events.getTicketsQty("5c8ea12ff3f2e42c44947f30").then(result => {
          expect(result).to.be.an("object");
          done();
        });
      });

      it("it should have property - ticketQty which value is a number", done => {
        Events.getTicketsQty("5c8ea12ff3f2e42c44947f30").then(result => {
          expect(result)
            .to.have.property("ticketQty")
            .to.be.an("number");
          done();
        });
      });
    });

    describe("Function delOneEvent(_id)", () => {
      it("it should be an object", done => {
        Events.delOneEvent("5c8ea12ff3f2e42c44947f30").then(result => {
          expect(result).to.be.an("object");
          done();
        });
      });
    });

    describe("Function incDecTickets(_id, ticketsBought)", () => {
      it("it should be an object", done => {
        Events.incDecTickets("5c8ea12ff3f2e42c44947f30", 2).then(result => {
          expect(result).to.be.an("object");
          done();
        });
      });

      it("it should have property - ticketQty which value is a number", done => {
        Events.incDecTickets("5c8ea12ff3f2e42c44947f30", 2).then(result => {
          expect(result)
            .to.have.property("ticketQty")
            .to.be.an("number");
          done();
        });
      });
    });
  });
});
