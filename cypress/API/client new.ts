// import {
// 	newBooking,
// 	updatedBookingData,
// 	partialUpdatedBookingData,
// } from './testData'

class NewApiClient {
	authToken: string
	bookingId: number

	// Client Methods
	public createBooking() {
		const newBooking = {
			firstname: 'John',
			lastname: 'Doe',
			totalprice: 200,
			depositpaid: true,
			bookingdates: {
				checkin: '2023-11-01',
				checkout: '2023-11-05',
			},
			additionalneeds: 'Breakfast',
		}
		cy.request({
			url: 'https://restful-booker.herokuapp.com/booking',
			method: 'POST',
			body: newBooking,
		}).then(function (response) {
			this.bookingId = response.body.bookingid
		})
	}

	public getBookingIds() {
		cy.request({
			url: 'https://restful-booker.herokuapp.com/booking',
			method: 'GET',
		}).then(function (response) {
			expect(response.status).to.equal(200)
			expect(response.body).to.be.an('array')
			cy.log('getting: ').then(function () {
				cy.log('>>>>>>' + this.bookingId)
			})
		})
	}

	public getBookingByID() {
		cy.request({
			url: `https://restful-booker.herokuapp.com/booking/${this.bookingId}`,
			method: 'GET',
		}).then((response) => {
			expect(response.status).to.equal(200)
		})
	}
}
export default new NewApiClient()
