import { useContext } from "react";
import useGetSecure from "../../../hooks/useGetSecure"
import { UserContext } from "../../../context/AuthProvider";
import NoDataLoader from "../../../Components/Loader/NoDataLoader";
import BookingRow from "./BookingRow";

const RenterDashboard = () => {

    const { user } = useContext(UserContext);

    const { data: bookings, isPending, refetch } = useGetSecure(["bookings", user?.email], `/api/bookings?email=${user?.email}`);

    console.log(bookings);


    return <div>
        <div>
            <h3 className="text-center my-5 font-semibold text-3xl">Manage or remove bookings</h3>
        </div>


        <div className="mt-20">
            {
                isPending ? <NoDataLoader />
                    : bookings?.length > 0 ? <div className="overflow-x-auto">
                        <table className="table">

                            <thead>
                                <tr>
                                    <th>Sl.</th>
                                    <th>Name</th>
                                    <th>Picture</th>
                                    <th>Rent</th>
                                    <th>Owner Contact</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    bookings?.map((house, index) => <BookingRow key={house?._id} booking={house} refetch={refetch} sl={index + 1} />)
                                }
                            </tbody>

                        </table>

                    </div>
                        : <div>
                            <h3 className="text-center my-20 font-semibold text-gray-500 text-3xl">No data found!</h3>
                        </div>
            }
        </div>
    </div>
}

export default RenterDashboard