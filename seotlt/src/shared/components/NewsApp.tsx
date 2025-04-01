import React, { useEffect, useState } from "react";
import { NewsItem } from "../../types/news";
import NewsForm from "./NewsForm";
import NewsItemCard from "./NewsItemCard";

const LOCAL_KEY = "news_items";

const NewsApp: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [form, setForm] = useState<{ id: number | null; title: string; content: string }>({
    id: null,
    title: "",
    content: "",
  });
  const [editing, setEditing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as NewsItem[];
        setNews(parsed);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Неизвестная ошибка");
        }
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(news));
  }, [news]);

  const handleFormChange = (name: string, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!form.title.trim() || !form.content.trim()) return;

    if (editing && form.id !== null) {
      setNews(prev =>
        prev.map(item =>
          item.id === form.id ? { ...item, title: form.title, content: form.content } : item
        )
      );
    } else {
      setNews(prev => [...prev, { id: Date.now(), title: form.title, content: form.content }]);
    }

    setForm({ id: null, title: "", content: "" });
    setEditing(false);
  };

  const handleSave = (id: number, title: string, content: string) => {
    setNews(prevNews => {
      const updated = prevNews.map(item => (item.id === id ? { ...item, title, content } : item));
      return updated;
    });
  };

  const handleDelete = (id: number) => {
    setNews(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4 text-center">📰 Новости</h1>
      <NewsForm form={form} editing={editing} onChange={handleFormChange} onSubmit={handleSubmit} />
      <div className="space-y-4">
        {error && <div className="text-red-500">{error}</div>}
        {news.map(item => (
          <NewsItemCard key={item.id} item={item} onSave={handleSave} onDelete={handleDelete} />
        ))}
        {news.length === 0 && <div className="text-center text-gray-500">Пока новостей нет</div>}
      </div>
    </div>
  );
};

export default NewsApp;
