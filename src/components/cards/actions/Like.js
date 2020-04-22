import React from 'react';

const Like = ({like}) => (
    <button
        type="button"
        onClick={like()}
    >
        <img src="images/misc/like.png" alt="Like User"/>
    </button>
);

export default Like;