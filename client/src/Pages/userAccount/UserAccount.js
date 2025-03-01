import { useState, useContext } from "react";
import axios from "axios";

import { UserContext } from "../../Context/UserContext";
import styles from "./UserAccount.module.css";
import InputField from "../../Components/inputField/InputField";
import Button from "../../Components/button/Button";

function UserAccount() {
  const { userDetail } = useContext(UserContext);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [userNewsTopics, setUserNewsTopics] = useState(userDetail.topics);

  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [updateTopicsOpen, setUpdateTopicsOpen] = useState(false);
  const [changePasswordLoading, setChangePasswordLoading] = useState(false);
  const [changeTopicsLoading, setChangeTopicsLoading] = useState(false);

  const topics = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];

  async function changePassword() {
    setChangePasswordLoading(true);
    if (newPassword !== confirmNewPassword) {
      alert("New passwords do not match");
      return;
    }
    const { id } = userDetail;

    const data = {
      id,
      oldPassword,
      newPassword,
    };

    const res = await axios.put(
      "http://localhost:4000/api/user/changePassword",
      data
    );
    const resData = res.data.message;
    console.log(resData);
    setChangePasswordLoading(false);
  }

  function handleTopicChange(e) {
    const topic = e.target.name;

    if (userNewsTopics.includes(topic)) {
      setUserNewsTopics(userNewsTopics.filter((t) => t !== topic));
    } else {
      setUserNewsTopics([...userNewsTopics, topic]);
    }
  }

  async function changeNewsTopics() {
    setChangeTopicsLoading(true);
    const { id } = userDetail;
    const data = {
      id,
      newTopics: userNewsTopics,
    };

    const res = await axios.put(
      "http://localhost:4000/api/user/updateTopics",
      data
    );
    const resData = res.data;
    console.log(resData);
    setChangeTopicsLoading(false);
  }

  return (
    <div className={styles.userAccount}>
      <header className={styles.userAccount_header}>
        <h2>User Account</h2>
      </header>

      <div className={styles.userAccount_section}>
        <h3>{userDetail.name}</h3>
        <h4>{userDetail.email}</h4>

        <div className={styles.userAccount_form}>
          <div>
            <h5 onClick={() => setChangePasswordOpen(!changePasswordOpen)}>
              Change Password
            </h5>
            {changePasswordOpen ? (
              <div>
                <InputField
                  type="password"
                  name="currentPassword"
                  placeholder="Enter current password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <InputField
                  type="password"
                  name="newPassword"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <InputField
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
                {!changePasswordLoading ? (
                  <Button onClick={changePassword} value="Change Password" />
                ) : (
                  <Button disabled="true" value="Change Password" />
                )}
              </div>
            ) : (
              <></>
            )}
          </div>

          <div>
            <h5 onClick={() => setUpdateTopicsOpen(!updateTopicsOpen)}>
              Update Topics Choosen
            </h5>
            {updateTopicsOpen ? (
              <div>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {topics.map((topic) => (
                    <InputField
                      label={topic}
                      type="checkbox"
                      name={topic}
                      checked={userNewsTopics.includes(topic) ? true : false}
                      onChange={handleTopicChange}
                    />
                  ))}
                </div>
                <Button onClick={changeNewsTopics} value="Change Topics" />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserAccount;
