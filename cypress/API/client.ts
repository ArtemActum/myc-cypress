import {
	newBooking,
	updatedBookingData,
	partialUpdatedBookingData,
} from './testData'

class ApiClient {
	//private _baseUrl: string
	private _authToken: string
	private _bookingId: number
	private _endpoint: string

	public get baseUrl(): string {
		return 'https://restful-booker.herokuapp.com'
	}

	public get endpoint(): string {
		return this._endpoint
	}

	public set endpoint(endpoint: string) {
		this._endpoint = this.baseUrl + endpoint
	}

	public get authToken(): string {
		return this._authToken
	}

	public set authToken(authToken: string) {
		this._authToken
	}

	public get bookingId(): number {
		return this._bookingId
	}

	public set bookingId(bookingId: number) {
		this._bookingId
	}

	// Client Methods
	public createToken(endpoint = '/auth') {
		const data = {
			username: 'admin',
			password: 'password123',
		}
		this.endpoint = endpoint
		cy.request({
			url: this.endpoint,
			method: 'POST',
			body: data,
		}).then((response) => {
			expect(response.status).to.equal(200)
			expect(response.body).to.have.property('token')
			this.authToken = response.body.token
		})
	}

	public createBooking(
		endpoint = '/booking',
	): Cypress.Chainable<Cypress.Response<any>> {
		this.endpoint = endpoint
		return cy
			.request({
				url: this.endpoint,
				method: 'POST',
				body: newBooking,
			})
			.then(function (response) {
				expect(response.status).to.equal(200)
				expect(response.body.booking.firstname).to.equal(
					newBooking.firstname,
				)
				expect(response.body.booking.lastname).to.equal(
					newBooking.lastname,
				)
				expect(response.body.booking.totalprice).to.equal(
					newBooking.totalprice,
				)
				expect(response.body.booking.depositpaid).to.equal(
					newBooking.depositpaid,
				)
				expect(response.body.booking.bookingdates.checkin).to.equal(
					newBooking.bookingdates.checkin,
				)
				expect(response.body.booking.bookingdates.checkout).to.equal(
					newBooking.bookingdates.checkout,
				)
				expect(response.body.booking.additionalneeds).to.equal(
					newBooking.additionalneeds,
				)
				expect(response.body).to.have.property('bookingid')

				this.bookingId = response.body.bookingid
			})
	}

	public getBookingIds(
		endpoint = '/booking',
	): Cypress.Chainable<Cypress.Response<any>> {
		this.endpoint = endpoint
		// expect(this.endpoint).to.be.equal(999)
		// expect(this._endpoint).to.be.equal(999)
		return cy
			.request({
				url: this.endpoint,
				method: 'GET',
			})
			.then(function (response) {
				expect(response.status).to.equal(200)
				expect(response.body).to.be.an('array')
				cy.log('getting: ').then(function () {
					cy.log('>>>>>>' + this.bookingId)
				})
			})
	}

	public getBookingByID(
		endpoint: string = '',
	): Cypress.Chainable<Cypress.Response<any>> {
		//endpoint = `/booking/${this.bookingId}`
		// endpoint = `/booking/xxx`
		this.endpoint = endpoint
		return cy
			.request({
				url: this.endpoint + `/booking/${this.bookingId}`,
				method: 'GET',
			})
			.then((response) => {
				expect(response.status).to.equal(200)
				expect(response.body.firstname).to.eq(newBooking.firstname)
				expect(response.body.lastname).to.eq(newBooking.lastname)
			})
	}

	public updateBooking(endpoint = `/booking/${this.bookingId}`) {
		this.endpoint = endpoint
		cy.request({
			url: this.endpoint,
			method: 'PUT',
			body: updatedBookingData,
			headers: {
				Cookie: `token= ${this.authToken}`,
				Authorisation: `Bearer ${this.authToken}`,
				Accept: `application/json`,
			},
		}).then((response) => {
			expect(response.status).to.equal(200)
			expect(response.body.firstname).to.equal(
				updatedBookingData.firstname,
			)
			expect(response.body.lastname).to.equal(updatedBookingData.lastname)
			expect(response.body.totalprice).to.equal(
				updatedBookingData.totalprice,
			)
			expect(response.body.depositpaid).to.equal(
				updatedBookingData.depositpaid,
			)
			expect(response.body.additionalneeds).to.equal(
				updatedBookingData.additionalneeds,
			)
		})
	}

	public partialUpdateBooking(endpoint = `/booking/${this.bookingId}`) {
		this.endpoint = endpoint
		cy.request({
			url: this.endpoint,
			method: 'PATCH',
			body: partialUpdatedBookingData,
			headers: {
				Cookie: `token= ${this.authToken}`,
				Authorisation: `Bearer ${this.authToken}`,
				Accept: `application/json`,
			},
		}).then((response) => {
			expect(response.body.totalprice).to.equal(
				partialUpdatedBookingData.totalprice,
			)
			expect(response.status).to.equal(200)
		})
	}

	public deleteBooking(endpoint = `/booking/${this.bookingId}`) {
		this.endpoint = endpoint
		cy.request({
			url: this.endpoint,
			method: 'DELETE',
			body: partialUpdatedBookingData,
			headers: {
				Cookie: `token= ${this.authToken}`,
				Authorisation: `Bearer ${this.authToken}`,
				Accept: `application/json`,
			},
		}).then((response) => {
			expect(response.status).to.equal(201)
		})
	}
}
export default new ApiClient()
