export default function HotelTag( {message} : {message: String} ) {
    return (
        <span className="flex px-4 py-1 text-ui-label-regular text-ct-light-dark bg-transparent-bg border border-transparent-stroke rounded-full">
            {message}
        </span>
    )
}