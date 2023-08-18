import React from "react";

const DataTable = () => {
    return (
        <div className="data-table">
            <div className="data-table__service">
                <button className="btn btn-copy">Copy table</button>
                <button className="btn btn-close"></button>
            </div>

            <div className="data-table__table">
                <table className="table">
                    <caption className="table__caption">Main table</caption>
                    <thead className="table__head">
                        <tr className="table__head-row">
                            <th className="table__head-cell" scope="col">Name</th>
                            <th className="table__head-cell" scope="col">Surname</th>
                            <th className="table__head-cell" scope="col">Age</th>
                            <th className="table__head-cell" scope="col">City</th>
                            <th className="table__head-cell"></th>
                        </tr>
                    </thead>
                    <tbody className="table__body">
                        <tr className="table__row">
                            <td className="table__cell">Alex</td>
                            <td className="table__cell">Semeniuk</td>
                            <td className="table__cell">39</td>
                            <td className="table__cell">Brest</td>
                            <td className="table__cell">
                                <div className="table__buttons-wrap">
                                    <button className="btn btn__edit">
                                        Edit
                                    </button>
                                    <button className="btn btn__del">
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr className="table__row table__row--empty">
                            <td className="table__cell"></td>
                            <td className="table__cell"></td>
                            <td className="table__cell"></td>
                            <td className="table__cell"></td>
                            <td className="table__cell"></td>
                        </tr>

                        <tr className="table__row table__row--empty">
                            <td className="table__cell"></td>
                            <td className="table__cell"></td>
                            <td className="table__cell"></td>
                            <td className="table__cell"></td>
                            <td className="table__cell"></td>
                        </tr>

                        <tr className="table__row table__row--empty">
                            <td className="table__cell"></td>
                            <td className="table__cell"></td>
                            <td className="table__cell"></td>
                            <td className="table__cell"></td>
                            <td className="table__cell"></td>
                        </tr>

                        <tr className="table__row table__row--empty">
                            <td className="table__cell"></td>
                            <td className="table__cell"></td>
                            <td className="table__cell"></td>
                            <td className="table__cell"></td>
                            <td className="table__cell"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default DataTable;

/*
<div className="data-table">
        <div className="data-table__service">
            <button className="btn btn-copy">Copy table</button>
            <button className="btn btn-close"></button>
        </div>
        <div className="data-table__table">
            <table className="table">
                <caption className="table__caption">Main table</caption>
                <thead className="table__head">
                    <tr className="table__head-row">
                        <th className="table__head-cell" scope="col">Name</th>
                        <th className="table__head-cell" scope="col">Surname</th>
                        <th className="table__head-cell" scope="col">Age</th>
                        <th className="table__head-cell" scope="col">City</th>
                        <th className="table__head-cell"></th>
                    </tr>
                </thead>
                <tbody className="table__body">
                    <tr className="table__row">
                        <td className="table__cell">Alex</td>
                        <td className="table__cell">Semeniuk</td>
                        <td className="table__cell">39</td>
                        <td className="table__cell">Brest</td>
                        <td className="table__cell">
                            <div className="table__buttons-wrap">
                                <button className="btn btn__edit">
                                    Edit
                                </button>
                                <button className="btn btn__del">
                                    Delete
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr className="table__row table__row--empty">
                        <td className="table__cell"></td>
                        <td className="table__cell"></td>
                        <td className="table__cell"></td>
                        <td className="table__cell"></td>
                        <td className="table__cell"></td>
                    </tr>

                    <tr className="table__row table__row--empty">
                        <td className="table__cell"></td>
                        <td className="table__cell"></td>
                        <td className="table__cell"></td>
                        <td className="table__cell"></td>
                        <td className="table__cell"></td>
                    </tr>

                    <tr className="table__row table__row--empty">
                        <td className="table__cell"></td>
                        <td className="table__cell"></td>
                        <td className="table__cell"></td>
                        <td className="table__cell"></td>
                        <td className="table__cell"></td>
                    </tr>

                    <tr className="table__row table__row--empty">
                        <td className="table__cell"></td>
                        <td className="table__cell"></td>
                        <td className="table__cell"></td>
                        <td className="table__cell"></td>
                        <td className="table__cell"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    */