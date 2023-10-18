describe('Restful Booker API Tests', () => {
	let authToken: string
	let bookingId: number

	before(() => {
		cy.request({
			method: 'POST',
			url: 'https://restful-booker.herokuapp.com/auth',
			body: {
				username: 'admin',
				password: 'password123',
			},
		}).then((response) => {
			expect(response.status).to.equal(200)
			expect(response.body).to.have.property('token')
			authToken = response.body.token
		})
	})

	it('Health Check', () => {
		cy.request({
			method: 'GET',
			url: 'https://restful-booker.herokuapp.com/ping',
			headers: {
				Authorization: `Bearer ${authToken}`,
			},
		}).then((response) => {
			expect(response.status).to.equal(201)
		})
	})

	it('Create Booking', () => {
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
			method: 'POST',
			url: 'https://restful-booker.herokuapp.com/booking',
			headers: {
				Authorization: `Bearer ${authToken}`,
			},
			body: newBooking,
		}).then((response) => {
			expect(response.status).to.equal(200)
			expect(response.body.booking.firstname).to.equal('John')
			expect(response.body.booking.lastname).to.equal('Doe')
			expect(response.body.booking.totalprice).to.equal(200)
			expect(response.body.booking.depositpaid).to.equal(true)
			expect(response.body.booking.bookingdates.checkin).to.equal(
				'2023-11-01',
			)
			expect(response.body.booking.bookingdates.checkout).to.equal(
				'2023-11-05',
			)
			expect(response.body.booking.additionalneeds).to.equal('Breakfast')
			expect(response.body).to.have.property('bookingid')
			bookingId = response.body.bookingid
		})
	})

	it('Get BookingIds', () => {
		cy.request({
			method: 'GET',
			url: 'https://restful-booker.herokuapp.com/booking',
			headers: {
				Authorization: `Bearer ${authToken}`,
			},
		}).then((response) => {
			expect(response.status).to.equal(200)
			expect(response.body).to.be.an('array')
		})
	})

	it('Get Booking by ID', () => {
		cy.request({
			method: 'GET',
			url: `https://restful-booker.herokuapp.com/booking/${bookingId}`,
			headers: {
				Authorization: `Bearer ${authToken}`,
			},
		}).then((response) => {
			expect(response.status).to.equal(200)
			expect(response.body.firstname).to.eq('John')
			expect(response.body.lastname).to.eq('Doe')
		})
	})

	it('Update Booking', () => {
		const updatedBookingData = {
			firstname: 'Artem',
			lastname: 'QA',
			totalprice: 300,
			depositpaid: true,
			bookingdates: {
				checkin: '2023-12-01',
				checkout: '2023-12-05',
			},
			additionalneeds: 'lunch',
		}
		cy.request({
			method: 'PUT',
			url: `https://restful-booker.herokuapp.com/booking/${bookingId}`,
			body: updatedBookingData,
			headers: {
				Cookie: `token= ${authToken}`,
				Authorisation: `Bearer ${authToken}`,
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
	})

	it('Partial Update Booking', () => {
		const partialUpdatedBookingData = {
			totalprice: 3000,
		}
		cy.request({
			method: 'PATCH',
			url: `https://restful-booker.herokuapp.com/booking/${bookingId}`,
			body: partialUpdatedBookingData,
			headers: {
				Cookie: `token= ${authToken}`,
				Authorisation: `Bearer ${authToken}`,
				//'Content-Type': 'application/json',
			},
		}).then((response) => {
			expect(response.status).to.equal(200)
		})
	})

	it('Delete Booking', () => {
		cy.request({
			method: 'DELETE',
			url: `https://restful-booker.herokuapp.com/booking/${bookingId}`,
			headers: {
				Cookie: `token= ${authToken}`,
				Authorisation: `Bearer ${authToken}`,
			},
		}).then((response) => {
			expect(response.status).to.equal(201)
		})
	})
})
