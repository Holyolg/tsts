import React, { useRef } from "react";
import { NewsItem } from "../../types/news";

interface Props {
  form: Omit<NewsItem, "id"> & { id: number | null };
  editing: boolean;
  onChange: (name: string, value: string) => void;
  onSubmit: () => void;
}

const NewsForm: React.FC<Props> = ({ form, onChange, onSubmit }) => {
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      contentRef.current?.focus();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.name, e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mb-6">
      <input
        name="title"
        className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-300 rounded-xl p-2 outline-none"
        placeholder="Заголовок"
        value={form.title}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
      />
      <textarea
        name="content"
        ref={contentRef}
        className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-300 rounded-xl p-2 outline-none"
        placeholder="Содержание"
        value={form.content}
        onChange={handleInput}
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-xl w-full">
        Добавить новость
      </button>
    </form>
  );
};

export default NewsForm;
