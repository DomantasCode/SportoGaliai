import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Calendar, Users, MapPin, ArrowRight, Newspaper } from 'lucide-react';
import { api } from '../src/lib/api';

interface NewsArticle {
  id: string;
  title: string;
  date: string;
  summary: string;
  content: string;
  hero_image: string;
  gallery: string[];
  published: number;
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('lt-LT', { year: 'numeric', month: 'long', day: 'numeric' });
};

// Parse inline text: auto-link URLs and support [text](url) markdown links
const URL_REGEX = /(\[([^\]]+)\]\((https?:\/\/[^\s)]+)\))|(https?:\/\/[^\s)]+)/g;

const parseInline = (text: string): React.ReactNode[] => {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = URL_REGEX.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const label = match[2] || match[4];
    const url = match[3] || match[4];
    parts.push(
      <a
        key={`link-${key++}`}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-primary font-bold underline decoration-primary/40 hover:decoration-primary underline-offset-4 hover:text-primary/80 transition-colors break-all"
      >
        {label}
      </a>
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts;
};

// Simple markdown-like renderer for content
const renderContent = (content: string) => {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Heading ##
    if (line.startsWith('## ')) {
      elements.push(
        <h3 key={i} className="font-display text-2xl md:text-3xl font-bold text-gray-900 dark:text-white pt-6 pb-2">
          {line.slice(3)}
        </h3>
      );
    }
    // Blockquote >
    else if (line.startsWith('> ')) {
      elements.push(
        <blockquote key={i} className="border-l-4 border-primary pl-6 py-2 my-4">
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 italic font-medium">
            {parseInline(line.slice(2))}
          </p>
        </blockquote>
      );
    }
    // List item -
    else if (line.startsWith('- ')) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].startsWith('- ')) {
        listItems.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={`list-${i}`} className="space-y-3 my-4">
          {listItems.map((item, j) => (
            <li key={j} className="flex items-start gap-3 text-gray-600 dark:text-gray-300 text-base md:text-lg">
              <span className="w-2 h-2 rounded-full bg-primary mt-2.5 flex-shrink-0"></span>
              <span>{parseInline(item)}</span>
            </li>
          ))}
        </ul>
      );
      continue; // already advanced i
    }
    // Empty line
    else if (line.trim() === '') {
      // skip
    }
    // Regular paragraph
    else {
      elements.push(
        <p key={i} className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed">
          {parseInline(line)}
        </p>
      );
    }
    i++;
  }

  return elements;
};

const News: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [lightboxImage, setLightboxImage] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await api.news.list();
        if (Array.isArray(data)) {
          setArticles(data.filter((a: NewsArticle) => a.published));
        }
      } catch (err) {
        console.error('Error loading news:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const closeLightbox = () => setLightboxImage(null);

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (lightboxImage === null || !selectedArticle) return;
    const total = selectedArticle.gallery.length;
    if (direction === 'prev') {
      setLightboxImage((lightboxImage - 1 + total) % total);
    } else {
      setLightboxImage((lightboxImage + 1) % total);
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxImage === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') navigateLightbox('prev');
      if (e.key === 'ArrowRight') navigateLightbox('next');
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxImage, selectedArticle]);

  if (loading || articles.length === 0) return null;

  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <section id="news" className="py-12 md:py-32 bg-white dark:bg-dark relative transition-colors duration-300">
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 2xl:px-12 3xl:px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-px w-12 bg-secondary"></span>
            <span className="text-primary font-bold tracking-widest uppercase text-xs">Naujienos</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 leading-none tracking-tight">
            Bendruomenės gyvenimas
          </h2>
        </div>

        {/* Featured Article - Full Width Hero */}
        <div
          className="group cursor-pointer mb-12"
          onClick={() => setSelectedArticle(featured)}
        >
          <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-gray-100 dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Image Side */}
              <div className="relative h-72 md:h-96 lg:h-[500px] overflow-hidden">
                <img
                  src={featured.hero_image}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-white/10 dark:lg:to-black/20"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:hidden"></div>

                {/* Mobile title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:hidden">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar size={14} className="text-white/80" />
                    <span className="text-sm font-medium text-white/80">{formatDate(featured.date)}</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white leading-tight">
                    {featured.title}
                  </h3>
                </div>
              </div>

              {/* Content Side */}
              <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                <div className="hidden lg:flex items-center gap-2 mb-6">
                  <div className="flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2">
                    <Calendar size={14} className="text-primary" />
                    <span className="text-sm font-bold text-primary">{formatDate(featured.date)}</span>
                  </div>
                </div>

                <h3 className="hidden lg:block font-display text-3xl xl:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-6 group-hover:text-primary transition-colors">
                  {featured.title}
                </h3>

                <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg leading-relaxed mb-8 line-clamp-4">
                  {featured.summary}
                </p>

                {/* Gallery Preview */}
                {featured.gallery.length > 0 && (
                  <div className="flex items-center gap-3 mb-8">
                    <div className="flex -space-x-3">
                      {featured.gallery.slice(0, 4).map((img, i) => (
                        <div key={i} className="w-10 h-10 md:w-12 md:h-12 rounded-xl overflow-hidden border-2 border-white dark:border-gray-900">
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                    <span className="text-sm text-gray-400 font-medium">+{featured.gallery.length} nuotraukų</span>
                  </div>
                )}

                <div className="flex items-center gap-2 text-primary font-bold group-hover:gap-4 transition-all">
                  <span>Skaityti ir žiūrėti nuotraukas</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* More Articles Grid (if more than 1) */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((article) => (
              <article
                key={article.id}
                className="group cursor-pointer"
                onClick={() => setSelectedArticle(article)}
              >
                <div className="relative rounded-[2rem] overflow-hidden bg-gray-100 dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-500">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={article.hero_image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/60 backdrop-blur-md rounded-2xl px-4 py-2 flex items-center gap-2">
                      <Calendar size={14} className="text-primary" />
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{formatDate(article.date)}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white leading-tight mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4">
                      {article.summary}
                    </p>
                    <div className="flex items-center gap-2 text-primary font-bold text-sm">
                      <span>Skaityti daugiau</span>
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-gray-900/80 backdrop-blur-md animate-in fade-in duration-500"
            onClick={() => setSelectedArticle(null)}
          ></div>

          <div className="bg-white dark:bg-gray-900 w-full max-w-4xl max-h-[90vh] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl relative z-10 animate-in zoom-in-95 slide-in-from-bottom-8 duration-500 border border-white/10 flex flex-col">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-50 w-10 h-10 md:w-12 md:h-12 bg-white/90 dark:bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-gray-900 dark:text-white hover:bg-primary hover:text-white transition-all duration-300 shadow-lg group"
            >
              <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>

            <div className="overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {/* Hero */}
              <div className="relative h-64 md:h-96">
                <img src={selectedArticle.hero_image} alt={selectedArticle.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-900 via-transparent to-transparent"></div>
              </div>

              {/* Content */}
              <div className="px-6 md:px-16 pb-10 md:pb-16 -mt-16 relative z-10">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <div className="flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2">
                    <Calendar size={14} className="text-primary" />
                    <span className="text-sm font-bold text-primary">{formatDate(selectedArticle.date)}</span>
                  </div>
                </div>

                <h1 className="font-display text-3xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-8 tracking-tight">
                  {selectedArticle.title}
                </h1>

                <div className="space-y-4">
                  {renderContent(selectedArticle.content)}
                </div>

                {/* Gallery */}
                {selectedArticle.gallery && selectedArticle.gallery.length > 0 && (
                  <div className="mt-12">
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                      Akimirkos
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                      {selectedArticle.gallery.map((img, index) => (
                        <div
                          key={index}
                          className="relative rounded-xl md:rounded-2xl overflow-hidden cursor-pointer group aspect-[4/3]"
                          onClick={(e) => { e.stopPropagation(); setLightboxImage(index); }}
                        >
                          <img src={img} alt={`Akimirka ${index + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightboxImage !== null && selectedArticle && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95" onClick={closeLightbox}>
          <button onClick={closeLightbox} className="absolute top-4 right-4 md:top-6 md:right-6 z-50 w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all group">
            <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); navigateLightbox('prev'); }} className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all">
            <ChevronLeft size={28} />
          </button>
          <img src={selectedArticle.gallery[lightboxImage]} alt={`Akimirka ${lightboxImage + 1}`} className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg" onClick={(e) => e.stopPropagation()} />
          <button onClick={(e) => { e.stopPropagation(); navigateLightbox('next'); }} className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all">
            <ChevronRight size={28} />
          </button>
          <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium">
            {lightboxImage + 1} / {selectedArticle.gallery.length}
          </div>
        </div>
      )}
    </section>
  );
};

export default News;