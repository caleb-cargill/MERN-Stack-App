import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';
import axios from 'axios';

const AssignUsers = ({ onUsersChange }) => {
    const [selectedUsers, setSelectedUsers] = useState([]);

    const loadUserOptions = async (inputValue) => {
        try {
            const response = await axios.get(`http://localhost:5000/users?search=${inputValue}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (selectedOptions) => {
        setSelectedUsers(selectedOptions);
        onUsersChange(selectedOptions.map(option => option.value));
    };

    return (
        <div>
            <label>Assign Users</label>
            <AsyncSelect
                isMulti
                cacheOptions
                defaultOptions
                loadOptions={loadUserOptions}
                onChange={handleChange}
                value={selectedUsers}
                placeholder="Search for users..." />
        </div>
    );
};

export default AssignUsers;