export type Auth = {
	token: string
}

export type CreateBooking = {
	bookingid: number
	booking: {
		firstname: string
		lastname: string
		totalprice: number
		depositpaid: boolean
		bookingdates: {
			checkin: string
			checkout: string
		}
		additionalneeds: string
	}
}

export type GetBookingIds = {
	bookingid: number
}

export type getBookingByID = {
	firstname: string
	lastname: string
	totalprice: number
	depositpaid: boolean
	bookingdates: {
		checkin: string
		checkout: string
	}
	additionalneeds: string
}

export type PartialUpdatedBookingData = {
	totalprice: number
}
