import React from "react";

function Input({ value, onChange, onInput, editTask, disabled }) {
  return (
    <form className="form">
      <input
        type="text"
        placeholder="Enter Task..."
        className="task-input"
        value={value}
        onChange={onChange}
      />
      <button
        className="add-btn"
        type="submit"
        onClick={onInput}
        disabled={disabled}
      >
        {editTask ? "OK" : "Add"}
      </button>
    </form>
  );
}

export default Input;
