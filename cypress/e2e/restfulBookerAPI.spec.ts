import Ajv from 'ajv'
import NewApiClient from '../API/clients/client new'
import {
	NewBooking,
	UpdatedBookingData,
	PartialUpdatedBookingData,
	Auth,
} from '../API/booking.request'
import {
	schemaCreateBooking,
	schemaGetBooking,
	schemaGetBookingIDs,
} from '../support/constants/apis'

describe('Restful Booker API Tests', () => {
	let authToken: string
	let bookingId: number

	//for schema checking
	const ajv = new Ajv()

	// test with whole collection
	it('API restful booker collection', () => {
		NewApiClient.createToken(Auth).then(function (response) {
			expect(response.status).to.equal(200)
			expect(response.body).to.have.property('token')
			expect(response.body.token).to.not.be.undefined
			authToken = response.body.token
		})
		NewApiClient.createBooking(NewBooking)
			.then((response) => {
				bookingId = response.body.bookingid
			})
			.then(() => {
				NewApiClient.getBookingIds().then(function (response) {
					expect(response.status).to.equal(200)
					expect(response.body).to.be.an('array')
					cy.log('getting: ').then(function () {
						cy.log('>>>>>>' + bookingId)
					})
				})
				NewApiClient.getBookingByID(bookingId)
				NewApiClient.updateBooking(
					bookingId,
					UpdatedBookingData,
					authToken,
				).then((response) => {
					expect(response.status).to.equal(200)
					expect(response.body.firstname).to.equal(
						UpdatedBookingData.firstname,
					)
					expect(response.body.lastname).to.equal(
						UpdatedBookingData.lastname,
					)
					expect(response.body.totalprice).to.equal(
						UpdatedBookingData.totalprice,
					)
					expect(response.body.depositpaid).to.equal(
						UpdatedBookingData.depositpaid,
					)
					expect(response.body.additionalneeds).to.equal(
						UpdatedBookingData.additionalneeds,
					)
				})
				NewApiClient.partialUpdateBooking(
					bookingId,
					PartialUpdatedBookingData,
					authToken,
				).then((response) => {
					expect(response.body.totalprice).to.equal(
						PartialUpdatedBookingData.totalprice,
					)
					expect(response.status).to.equal(200)
				})
				NewApiClient.deleteBooking(
					bookingId,
					PartialUpdatedBookingData,
					authToken,
				).then((response) => {
					expect(response.status).to.equal(201)
				})
			})
	})

	//tests written without client.ts
	before(() => {
		cy.request({
			method: 'POST',
			url: NewApiClient.baseUrlAPI('/auth'),
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

	it('Create Booking', () => {
		cy.request({
			method: 'POST',
			url: NewApiClient.baseUrlAPI('/booking'),
			body: NewBooking,
		}).then((response) => {
			expect(response.status).to.equal(200)
			expect(response.body.booking.firstname).to.equal(
				NewBooking.firstname,
			)
			expect(response.body.booking.lastname).to.equal(NewBooking.lastname)
			expect(response.body.booking.totalprice).to.equal(
				NewBooking.totalprice,
			)
			expect(response.body.booking.depositpaid).to.equal(
				NewBooking.depositpaid,
			)
			expect(response.body.booking.bookingdates.checkin).to.equal(
				NewBooking.bookingdates.checkin,
			)
			expect(response.body.booking.bookingdates.checkout).to.equal(
				NewBooking.bookingdates.checkout,
			)
			expect(response.body.booking.additionalneeds).to.equal(
				NewBooking.additionalneeds,
			)
			expect(response.body).to.have.property('bookingid')
			bookingId = response.body.bookingid
			const validate = ajv.compile(schemaCreateBooking)
			const isValid = validate(response.body)
			expect(isValid).to.be.true
		})
	})

	it('Get BookingIds', () => {
		cy.request({
			method: 'GET',
			url: NewApiClient.baseUrlAPI('/booking'),
		}).then((response) => {
			expect(response.status).to.equal(200)
			expect(response.body).to.be.an('array')
			const validate = ajv.compile(schemaGetBookingIDs)
			const isValid = validate(response.body)
			expect(isValid).to.be.true
		})
	})

	it('Get Booking by ID', () => {
		cy.request({
			method: 'GET',
			url: NewApiClient.baseUrlAPI(`/booking/${bookingId}`),
		}).then((response) => {
			expect(response.status).to.equal(200)
			expect(response.body.firstname).to.eq(NewBooking.firstname)
			expect(response.body.lastname).to.eq(NewBooking.lastname)
			const validate = ajv.compile(schemaGetBooking)
			const isValid = validate(response.body)
			expect(isValid).to.be.true
		})
	})

	it('Update Booking', () => {
		cy.request({
			method: 'PUT',
			url: NewApiClient.baseUrlAPI(`/booking/${bookingId}`),
			body: UpdatedBookingData,
			headers: {
				Cookie: `token= ${authToken}`,
				Authorisation: `Bearer ${authToken}`,
				Accept: `application/json`,
			},
		}).then((response) => {
			expect(response.status).to.equal(200)
			expect(response.body.firstname).to.equal(
				UpdatedBookingData.firstname,
			)
			expect(response.body.lastname).to.equal(UpdatedBookingData.lastname)
			expect(response.body.totalprice).to.equal(
				UpdatedBookingData.totalprice,
			)
			expect(response.body.depositpaid).to.equal(
				UpdatedBookingData.depositpaid,
			)
			expect(response.body.additionalneeds).to.equal(
				UpdatedBookingData.additionalneeds,
			)
			const validate = ajv.compile(schemaGetBooking)
			const isValid = validate(response.body)
			expect(isValid).to.be.true
		})
	})

	it('Partial Update Booking', () => {
		cy.request({
			method: 'PATCH',
			url: NewApiClient.baseUrlAPI(`/booking/${bookingId}`),
			body: PartialUpdatedBookingData,
			headers: {
				Cookie: `token= ${authToken}`,
				Authorisation: `Bearer ${authToken}`,
			},
		}).then((response) => {
			expect(response.body.totalprice).to.equal(
				PartialUpdatedBookingData.totalprice,
			)
			expect(response.status).to.equal(200)
			const validate = ajv.compile(schemaGetBooking)
			const isValid = validate(response.body)
			expect(isValid).to.be.true
		})
	})

	it('Delete Booking', () => {
		cy.request({
			method: 'DELETE',
			url: NewApiClient.baseUrlAPI(`/booking/${bookingId}`),
			headers: {
				Cookie: `token= ${authToken}`,
				Authorisation: `Bearer ${authToken}`,
			},
		}).then((response) => {
			expect(response.status).to.equal(201)
		})
	})
})
