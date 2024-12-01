import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './redux/store';
import { updateField, resetForm } from './components/formSlice';

interface SubmittedData {
  id: number;
  name: string;
  email: string;
  message: string;
}

const FormComponent: React.FC = () => {
  const formData = useSelector((state: RootState) => state.form);
  const dispatch: AppDispatch = useDispatch();

  const [submittedDataList, setSubmittedDataList] = useState<SubmittedData[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    dispatch(updateField({ field: name as keyof typeof formData, value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId !== null) {
      // Обновляем существующий элемент
      setSubmittedDataList((prev) =>
        prev.map((data) =>
          data.id === editingId ? { ...data, ...formData } : data
        )
      );
      setEditingId(null); // Сбрасываем режим редактирования
    } else {
      // Добавляем новый элемент
      setSubmittedDataList((prev) => [
        ...prev,
        { id: new Date().getTime(), name: formData.name, email: formData.email, message: formData.message },
      ]);
    }

    dispatch(resetForm()); // Очищаем форму
  };

  const handleEdit = (id: number) => {
    const dataToEdit = submittedDataList.find((data) => data.id === id);
    if (dataToEdit) {
      setEditingId(id); // Устанавливаем ID редактируемого элемента
      Object.entries(dataToEdit).forEach(([field, value]) => {
        if (field !== 'id') {
          dispatch(updateField({ field: field as keyof typeof formData, value: value as string }));
        }
      });
    }
  };

  const handleDelete = (id: number) => {
    setSubmittedDataList((prev) => prev.filter((data) => data.id !== id));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Message:
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit">{editingId !== null ? 'Update' : 'Submit'}</button>
        <button type="button" onClick={() => dispatch(resetForm())}>
          Reset
        </button>
      </form>

      {submittedDataList.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3>Submitted Data:</h3>
          {submittedDataList.map((data) => (
            <div
              key={data.id}
              style={{
                marginBottom: '15px',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
              }}
            >
              <p>
                <strong>Name:</strong> {data.name}
              </p>
              <p>
                <strong>Email:</strong> {data.email}
              </p>
              <p>
                <strong>Message:</strong> {data.message}
              </p>
              <button
                onClick={() => handleEdit(data.id)}
                style={{ marginRight: '10px' }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(data.id)}
                style={{ backgroundColor: 'red', color: 'white' }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormComponent;