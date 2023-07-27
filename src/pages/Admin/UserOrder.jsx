
const UserOrder = () => {
    const tableArr = [];
    for (let index = 0; index < 10; index++) {
        tableArr.push(index);
    }
    return (
        <div className="overflow-x-auto py-3 lg:px-5 lg:mr-10 rounded-2xl bg-white">
            <table className="w-full text-left">
                {/* -------head-------- */}
                <thead className="">
                    <tr className="flex justify-between text-xs lg:text-sm lg:mb-5 lg:bg-[#F5F6FA] rounded-2xl py-3 px-5 ">
                        <th className="font-semibold flex-1">Name</th>
                        <th className="font-semibold flex-1 ">Email</th>
                        <th className="font-semibold flex-1 lg:ml-10 lg:pl-5">Service</th>
                        <th className="font-semibold flex-1 ">Pay With</th>
                        <th className="font-semibold flex-1  ">Status</th>
                    </tr>
                </thead>
                {/* -------body------- */}
                <tbody className="space-y-10">
                    {
                        tableArr.map((i) => <>
                            <tr className="flex justify-between  space-x-5 px-5 text-xs lg:text-sm ">
                                <td className="flex-1">Md Arif</td>
                                <td className="flex-1 ">onexboy<br className="lg:hidden"/>arif6833<br className="lg:hidden"/>@gmail<br className="lg:hidden"/>.com</td>
                                <td className="flex-1 lg:ml-10">Office Interior Design</td>
                                <td className="flex-1">Credit Card</td>
                                <td className="flex-1">
                                    <select className="bg-white" name="" id="">
                                        <option value="">Pending</option>
                                        <option value="">On going</option>
                                        <option value="">Done</option>
                                    </select>
                                </td>
                            </tr>
                        </>)
                    }


                </tbody>
            </table>
        </div >
    );
};

export default UserOrder;