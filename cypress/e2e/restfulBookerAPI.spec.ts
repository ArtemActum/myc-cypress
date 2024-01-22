import Ajv from 'ajv'
import client from '../API/client'
import ApiClient from '../API/client'
import NewApiClient from '../API/client new'
import {
	newBooking,
	updatedBookingData,
	partialUpdatedBookingData,
} from '../API/testData'
import {
	schemaCreateBooking,
	schemaGetBooking,
	schemaGetBookingIDs,
} from '../support/constants/apis'

describe('Restful Booker API Tests', () => {
	let authToken: string
	let bookingId: number

	function baseUrlAPI(path) {
		return `https://restful-booker.herokuapp.com${path}`
	}

	const ajv = new Ajv()

	it('API restful booker collection', () => {
		//status: In progress
	})

	before(() => {
		cy.request({
			method: 'POST',
			url: baseUrlAPI('/auth'),
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
			url: baseUrlAPI('/booking'),
			body: newBooking,
		}).then((response) => {
			expect(response.status).to.equal(200)
			expect(response.body.booking.firstname).to.equal(
				newBooking.firstname,
			)
			expect(response.body.booking.lastname).to.equal(newBooking.lastname)
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
			bookingId = response.body.bookingid
			const validate = ajv.compile(schemaCreateBooking)
			const isValid = validate(response.body)
			expect(isValid).to.be.true
		})
	})

	it('Get BookingIds', () => {
		cy.request({
			method: 'GET',
			url: baseUrlAPI('/booking'),
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
			url: baseUrlAPI(`/booking/${bookingId}`),
		}).then((response) => {
			expect(response.status).to.equal(200)
			expect(response.body.firstname).to.eq(newBooking.firstname)
			expect(response.body.lastname).to.eq(newBooking.lastname)
			const validate = ajv.compile(schemaGetBooking)
			const isValid = validate(response.body)
			expect(isValid).to.be.true
		})
	})

	it('Update Booking', () => {
		cy.request({
			method: 'PUT',
			url: baseUrlAPI(`/booking/${bookingId}`),
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
			const validate = ajv.compile(schemaGetBooking)
			const isValid = validate(response.body)
			expect(isValid).to.be.true
		})
	})

	it('Partial Update Booking', () => {
		cy.request({
			method: 'PATCH',
			url: baseUrlAPI(`/booking/${bookingId}`),
			body: partialUpdatedBookingData,
			headers: {
				Cookie: `token= ${authToken}`,
				Authorisation: `Bearer ${authToken}`,
			},
		}).then((response) => {
			expect(response.body.totalprice).to.equal(
				partialUpdatedBookingData.totalprice,
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
			url: baseUrlAPI(`/booking/${bookingId}`),
			headers: {
				Cookie: `token= ${authToken}`,
				Authorisation: `Bearer ${authToken}`,
			},
		}).then((response) => {
			expect(response.status).to.equal(201)
		})
	})
})
