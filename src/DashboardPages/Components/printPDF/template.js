module.exports = ({ name, price1, price2, receiptId }) => {
    const today = new Date();
    return `
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <style>
                table {
                    border-collapse: collapse;
                    width: 100%;
                    border: 2px solid #ddd;
                }

                tr {
                    border-bottom: 1px solid #ddd;
                }

                td, th{
                    padding: 16px;
                }

                tfoot td{
                    text-align: right;
                }
            </style>
        </head>

        <body>
            <h2>Residents</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Birthday</th>
                        <th>Address</th>
                        <th>Occupation</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Sample Name</td>
                        <td>Sample Age</td>
                        <td>Sample Birthday</td>
                        <td>Sample Address</td>
                        <td>Sample Occupation</td>
                    </tr>
                    <tr>
                        <td>Sample Name</td>
                        <td>Sample Age</td>
                        <td>Sample Birthday</td>
                        <td>Sample Address</td>
                        <td>Sample Occupation</td>
                    </tr>
                    <tr>
                        <td>Sample Name</td>
                        <td>Sample Age</td>
                        <td>Sample Birthday</td>
                        <td>Sample Address</td>
                        <td>Sample Occupation</td>
                    </tr>
                    <tr>
                        <td>Sample Name</td>
                        <td>Sample Age</td>
                        <td>Sample Birthday</td>
                        <td>Sample Address</td>
                        <td>Sample Occupation</td>
                    </tr>
                    <tr>
                        <td>Sample Name</td>
                        <td>Sample Age</td>
                        <td>Sample Birthday</td>
                        <td>Sample Address</td>
                        <td>Sample Occupation</td>
                    </tr>
                    <tr>
                        <td>Sample Name</td>
                        <td>Sample Age</td>
                        <td>Sample Birthday</td>
                        <td>Sample Address</td>
                        <td>Sample Occupation</td>
                    </tr>
                    <tr>
                        <td>Sample Name</td>
                        <td>Sample Age</td>
                        <td>Sample Birthday</td>
                        <td>Sample Address</td>
                        <td>Sample Occupation</td>
                    </tr>
                    <tr>
                        <td>Sample Name</td>
                        <td>Sample Age</td>
                        <td>Sample Birthday</td>
                        <td>Sample Address</td>
                        <td>Sample Occupation</td>
                    </tr>
                    <tr>
                        <td>Sample Name</td>
                        <td>Sample Age</td>
                        <td>Sample Birthday</td>
                        <td>Sample Address</td>
                        <td>Sample Occupation</td>
                    </tr>
                    <tr>
                        <td>Sample Name</td>
                        <td>Sample Age</td>
                        <td>Sample Birthday</td>
                        <td>Sample Address</td>
                        <td>Sample Occupation</td>
                    </tr>
                    <tr>
                        <td>Sample Name</td>
                        <td>Sample Age</td>
                        <td>Sample Birthday</td>
                        <td>Sample Address</td>
                        <td>Sample Occupation</td>
                    </tr>
                    <tr>
                        <td>Sample Name</td>
                        <td>Sample Age</td>
                        <td>Sample Birthday</td>
                        <td>Sample Address</td>
                        <td>Sample Occupation</td>
                    </tr>
                    <tr>
                        <td>Sample Name</td>
                        <td>Sample Age</td>
                        <td>Sample Birthday</td>
                        <td>Sample Address</td>
                        <td>Sample Occupation</td>
                    </tr>
                    <tr>
                        <td>Sample Name</td>
                        <td>Sample Age</td>
                        <td>Sample Birthday</td>
                        <td>Sample Address</td>
                        <td>Sample Occupation</td>
                    </tr>
                    <tr>
                        <td>Sample Name</td>
                        <td>Sample Age</td>
                        <td>Sample Birthday</td>
                        <td>Sample Address</td>
                        <td>Sample Occupation</td>
                    </tr>
                    <tr>
                        <td>Sample Name</td>
                        <td>Sample Age</td>
                        <td>Sample Birthday</td>
                        <td>Sample Address</td>
                        <td>Sample Occupation</td>
                    </tr>
                    <tr>
                        <td>Sample Name</td>
                        <td>Sample Age</td>
                        <td>Sample Birthday</td>
                        <td>Sample Address</td>
                        <td>Sample Occupation</td>
                    </tr>
                    <tr>
                        <td>Sample Name</td>
                        <td>Sample Age</td>
                        <td>Sample Birthday</td>
                        <td>Sample Address</td>
                        <td>Sample Occupation</td>
                    </tr>
                    <tr>
                        <td>Sample Name</td>
                        <td>Sample Age</td>
                        <td>Sample Birthday</td>
                        <td>Sample Address</td>
                        <td>Sample Occupation</td>
                    </tr>
                    <tr>
                        <td>Sample Name</td>
                        <td>Sample Age</td>
                        <td>Sample Birthday</td>
                        <td>Sample Address</td>
                        <td>Sample Occupation</td>
                    </tr>
                    <tr>
                        <td>Sample Name</td>
                        <td>Sample Age</td>
                        <td>Sample Birthday</td>
                        <td>Sample Address</td>
                        <td>Sample Occupation</td>
                    </tr>
                    <tr>
                        <td>Sample Name</td>
                        <td>Sample Age</td>
                        <td>Sample Birthday</td>
                        <td>Sample Address</td>
                        <td>Sample Occupation</td>
                    </tr>
                    <tr>
                        <td>Sample Name</td>
                        <td>Sample Age</td>
                        <td>Sample Birthday</td>
                        <td>Sample Address</td>
                        <td>Sample Occupation</td>
                    </tr>
                    <tr>
                        <td>Sample Name</td>
                        <td>Sample Age</td>
                        <td>Sample Birthday</td>
                        <td>Sample Address</td>
                        <td>Sample Occupation</td>
                    </tr>
                    <tr>
                        <td>Sample Name</td>
                        <td>Sample Age</td>
                        <td>Sample Birthday</td>
                        <td>Sample Address</td>
                        <td>Sample Occupation</td>
                    </tr>
                    <tr>
                        <td>Sample Name</td>
                        <td>Sample Age</td>
                        <td>Sample Birthday</td>
                        <td>Sample Address</td>
                        <td>Sample Occupation</td>
                    </tr>
                    <tr>
                        <td>Sample Name</td>
                        <td>Sample Age</td>
                        <td>Sample Birthday</td>
                        <td>Sample Address</td>
                        <td>Sample Occupation</td>
                    </tr>
                    <tr>
                        <td>Sample Name</td>
                        <td>Sample Age</td>
                        <td>Sample Birthday</td>
                        <td>Sample Address</td>
                        <td>Sample Occupation</td>
                    </tr>
                    <tr>
                        <td>Sample Name</td>
                        <td>Sample Age</td>
                        <td>Sample Birthday</td>
                        <td>Sample Address</td>
                        <td>Sample Occupation</td>
                    </tr>
                    <tr>
                        <td>Sample Name</td>
                        <td>Sample Age</td>
                        <td>Sample Birthday</td>
                        <td>Sample Address</td>
                        <td>Sample Occupation</td>
                    </tr>
                    <tr>
                        <td>Sample Name</td>
                        <td>Sample Age</td>
                        <td>Sample Birthday</td>
                        <td>Sample Address</td>
                        <td>Sample Occupation</td>
                    </tr>
                    <tr>
                        <td>Sample Name</td>
                        <td>Sample Age</td>
                        <td>Sample Birthday</td>
                        <td>Sample Address</td>
                        <td>Sample Occupation</td>
                    </tr>
                </tbody>
                <tfoot>
                    <td colspan="5">Total Residents: 8</td>
                </tfoot>
            </table>
        </body>

        </html>
    `;
};