export interface Hotel {
  _id: string,
  name: string,
  address: string,
  district: string,
  province: string,
  postalcode: string,
  tel: string,
  dailyRate: string,
  __v: number,
  id: number,
  userRatingCount: number,
  ratingSum: number,
  length: number
}

export interface HotelItem {
    data: Hotel
  }
  
export interface HotelJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: Hotel[]
  }

export interface BookingItem {
    _id: string,
    checkInDate: string,
    checkOutDate: string,
    user: string,
    hotel: {
      _id: string,
      name: string,
      address: string,
      tel: string
    },
    createdAt: string
  }

export interface BookingJson {
    success: boolean,
    count: number,
    data: BookingItem[]
}

export interface userProfile {
  _id: string,
  name: string,
  email: string,
  tel: string,
  role: string,
  createdAt: string
}

export interface userJson {
  success: boolean,
  data: userProfile
}