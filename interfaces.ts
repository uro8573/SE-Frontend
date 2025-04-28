export interface Hotel {
    _id: string,
    name: string,
    address: string,
    district: string,
    province: string,
    postalcode: string,
    region: string,
    tel: string,
    dailyRate: string,
    guests: number,
    picture: string,
    size: string,
    __v: number,
    id: number,
    length: number,
    description: string,
    about: string,
    userRatingCount: number,
    ratingSum: number
}

export interface Config {
    noti_period : number
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

export interface Review {
    type: string
    _id: string,
    user: {
        _id: string,
        name: string
    },
    hotel: {
      _id: string,
      name: string
    },
    rating: number,
    comment: string,
    createdAt: Date
}

export interface ReviewItem { 
    data: Review
}

export interface ReviewJson {
    success: boolean,
    count: number,
    data: Review[]
}

export interface BookingItem {
    _id: string,
    guest: number,
    room: string,
    checkInDate: string,
    checkOutDate: string,
    user: string,
    hotel: {
      _id: string,
      name: string,
      address: string,
      tel: string,
      picture: string
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
    isVerify: string,
    createdAt: string,
}

export interface userJson {
    success: boolean,
    data: userProfile
}

export interface notification{
    _id: string,
    user:userProfile ,
    text: string,
    isRead: boolean,
    message: string,
    type: string,
    createdAt: Date,
    typeAction: string,
}