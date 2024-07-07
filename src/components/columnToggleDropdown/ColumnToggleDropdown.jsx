// src/components/ColumnToggleDropdown.js
import { useState, useEffect, useRef } from 'react';
import styles from './ColumnToggleDropdown.module.scss';

const ColumnToggleDropdown = ({
  allColumns,
  columnVisibility,
  handleColumnVisibilityChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleSelectAll = () => {
    allColumns.forEach((column) => {
      handleColumnVisibilityChange(column.id, true);
    });
  };

  const handleDeselectAll = () => {
    allColumns.forEach((column) => {
      handleColumnVisibilityChange(column.id, false);
    });
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('click', handleClickOutside);
    } else {
      window.removeEventListener('click', handleClickOutside);
    }

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button onClick={toggleDropdown} className={styles.dropdownButton}>
        Toggle Columns
      </button>
      {isOpen && (
        <div className={styles.dropdownContent}>
          <button onClick={handleSelectAll}>Select All</button>
          <button onClick={handleDeselectAll}>Deselect All</button>
          {allColumns.map((column) => (
            <label key={column.id} className={styles.dropdownItem}>
              <input
                type='checkbox'
                checked={columnVisibility[column.id]}
                onChange={() => handleColumnVisibilityChange(column.id)}
              />{' '}
              {column.Header}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColumnToggleDropdown;
