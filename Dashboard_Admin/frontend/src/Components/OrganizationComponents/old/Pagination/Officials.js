import React from 'react';

const Officials = ({ posts, id, name, position, flag}) => {
    return (
        posts.map(post => {
            return (
                <tr>
                    <td>{post.name}</td>
                    <td>{post.typeOfMember}</td>
                    <td className='buttons'>
                        <div>
                            <button onClick={() => {
                                id(post.id)
                                name(post.name)
                                position(post.typeOfMember)
                                flag(true)
                            }}>UPDATE</button>
                            <button onClick={() => {
                            }}>DELETE</button>
                        </div>
                    </td>
                </tr>
            );
        }
        )
    );
};

export default Officials;