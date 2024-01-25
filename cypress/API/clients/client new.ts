import {
	Auth,
	CreateBooking,
	GetBookingIds,
	PartialUpdatedBookingData,
	getBookingByID,
} from '../booking.response'

class NewApiClient {
	authToken: string
	bookingId: number

	public baseUrlAPI(path: string) {
		return `https://restful-booker.herokuapp.com${path}`
	}

	// Client Methods
	public createToken(
		body: object,
	): Cypress.Chainable<Cypress.Response<Auth>> {
		return cy.request({
			url: this.baseUrlAPI('/auth'),
			method: 'POST',
			body: body,
		})
	}

	public createBooking(
		body: object,
	): Cypress.Chainable<Cypress.Response<CreateBooking>> {
		return cy.request({
			url: this.baseUrlAPI('/booking'),
			method: 'POST',
			body: body,
		})
	}

	public getBookingIds(): Cypress.Chainable<Cypress.Response<GetBookingIds>> {
		return cy.request({
			url: this.baseUrlAPI(`/booking`),
			method: 'GET',
		})
	}

	public getBookingByID(
		bookingId: number,
	): Cypress.Chainable<Cypress.Response<getBookingByID>> {
		return cy
			.request({
				url: this.baseUrlAPI(`/booking/` + bookingId),
				method: 'GET',
			})
			.then((response) => {
				expect(response.status).to.equal(200)
			})
	}

	public updateBooking(
		bookingId: number,
		body: object,
		authToken: string,
	): Cypress.Chainable<Cypress.Response<getBookingByID>> {
		return cy.request({
			url: this.baseUrlAPI(`/booking/` + bookingId),
			method: 'PUT',
			body: body,
			headers: {
				Cookie: `token =` + authToken,
				Accept: `application/json`,
			},
		})
	}

	public partialUpdateBooking(
		bookingId: number,
		body: object,
		authToken: string,
	): Cypress.Chainable<Cypress.Response<PartialUpdatedBookingData>> {
		return cy.request({
			url: this.baseUrlAPI(`/booking/` + bookingId),
			method: 'PATCH',
			body: body,
			headers: {
				Cookie: `token =` + authToken,
				Accept: `application/json`,
			},
		})
	}

	public deleteBooking(bookingId: number, body: object, authToken: string) {
		return cy.request({
			url: this.baseUrlAPI(`/booking/` + bookingId),
			method: 'DELETE',
			body: body,
			headers: {
				Cookie: `token =` + authToken,
				Accept: `application/json`,
			},
		})
	}
}
export default new NewApiClient()
