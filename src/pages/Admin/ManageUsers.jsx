import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import Loading from "../../components/Loading";

const ManageUsers = () => {
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['user'],
        queryFn: () => fetch('https://luxury-living-server-production.up.railway.app/users')
            .then(res => res.json())
    })
    if (isLoading) {
        return <Loading />
    }
    if (isError) {
        console.log(isError);
    }
    const handleUpdateAdmin = ({ email, role }) => {
        fetch(`https://luxury-living-server-production.up.railway.app/users?email=${email}`, {
            method: 'PATCH',
            body: JSON.stringify({
                role: role
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount) {
                    refetch();
                    toast.success('Role updated successfully!')
                }

            });
    }
    return (
        <div className="overflow-x-auto py-3 lg:px-5 lg:mr-10 rounded-2xl bg-white">
            <table className="w-full text-left">
                {/* -------head-------- */}
                <thead className="">
                    <tr className="flex justify-between text-xs lg:text-sm lg:mb-5 lg:bg-[#F5F6FA] rounded-2xl py-3 px-5 ">
                        <th className="font-semibold flex-1">Name</th>
                        <th className="font-semibold flex-1">Email</th>
                        <th className="font-semibold flex-1 lg:ml-10 lg:pl-5">Role</th>
                        <th className="font-semibold flex-1">Make Admin</th>
                        <th className="font-semibold flex-1">Remove Admin</th>
                    </tr>
                </thead>
                {/* -------body------- */}
                <tbody className="space-y-10">
                    {
                        data.map((user) => <>
                            <tr className="flex justify-between items-center  space-x-5 px-5 text-xs lg:text-sm ">
                                <td className="flex-1">{user.userName}</td>
                                <td className="flex-1 ">{user.email}</td>
                                <td
                                    className={`flex-1 lg:ml-10  font-semibold ${user.role === 'admin' && 'text-green-500'}`}>({user.role}) </td>
                                <td className="flex-1">
                                    <button
                                        className={`btn ${user.role === 'admin' && 'bg-slate-400 active:scale-100'} py-1 px-2`}
                                        onClick={() => handleUpdateAdmin({ email: user.email, role: 'admin' })}
                                        disabled={user.role === 'admin' && true}
                                    >Make Admin</button>
                                </td>
                                <td className="flex-1">
                                    <button
                                        className={`btn px-2 bg-red-600 py-1 ${user.role === 'user' && 'bg-slate-400 active:scale-100'}`}
                                        onClick={() => handleUpdateAdmin({ email: user.email, role: 'user' })}
                                        disabled={user.role === 'user' && true}

                                    >Remove Admin</button>
                                </td>
                            </tr>
                        </>)
                    }


                </tbody>
            </table>
        </div >
    );
};

export default ManageUsers;