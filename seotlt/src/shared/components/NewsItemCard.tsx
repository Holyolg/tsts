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
    <div className="border border-solid border-gray-300 p-3 rounded-xl shadow-sm">
      {editing ? (
        <>
          <input
            className="w-full border border-solid border-gray-300 p-1 mb-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-300 rounded-xl p-2 outline-none"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            className="w-full border border-solid border-gray-300 p-1 mb-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-300 rounded-xl p-2 outline-none"
            value={content}
            onChange={e => setContent(e.target.value)}
          />
          <div className="flex justify-end gap-2 c">
            <button
              onClick={handleSave}
              className="text-green-600 text-sm active:text-gray-300
              hover:opacity-70">
              💾 Сохранить
            </button>
            <button
              onClick={handleCancel}
              className="text-gray-500 text-sm active:text-gray-300 hover:opacity-70">
              ❌ Отмена
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="font-semibold">{item.title}</div>
          <div className="text-sm text-gray-700 mb-2">{item.content}</div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setEditing(true)}
              className="text-blue-600 text-sm active:text-gray-300
              hover:opacity-70 cursor-pointer">
              ✏️ Редактировать
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="text-red-600 text-sm active:text-gray-300
              hover:opacity-70 cursor-pointer">
              🗑️ Удалить
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NewsItemCard;
