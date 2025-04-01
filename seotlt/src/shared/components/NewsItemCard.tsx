import React, { useState } from "react";
import { NewsItem } from "../../types/news";

interface Props {
  item: NewsItem;
  onDelete: (id: number) => void;
  onSave: (id: number, title: string, content: string) => void;
}

const NewsItemCard: React.FC<Props> = ({ item, onDelete, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(item.title);
  const [content, setContent] = useState(item.content);

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;
    onSave(item.id, title, content);
    setEditing(false);
  };

  const handleCancel = () => {
    setTitle(item.title);
    setContent(item.content);
    setEditing(false);
  };

  return (
    <div className="border p-3 rounded shadow-sm">
      {editing ? (
        <>
          <input
            className="w-full border border-gray-300 p-1 mb-2 rounded"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            className="w-full border border-gray-300 p-1 mb-2 rounded"
            value={content}
            onChange={e => setContent(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <button onClick={handleSave} className="text-green-600 text-sm">
              💾 Сохранить
            </button>
            <button onClick={handleCancel} className="text-gray-500 text-sm">
              ❌ Отмена
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="font-semibold">{item.title}</div>
          <div className="text-sm text-gray-700 mb-2">{item.content}</div>
          <div className="flex justify-end gap-2">
            <button onClick={() => setEditing(true)} className="text-blue-600 text-sm">
              ✏️ Редактировать
            </button>
            <button onClick={() => onDelete(item.id)} className="text-red-600 text-sm">
              🗑️ Удалить
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NewsItemCard;
