import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types/heritage';
import {
  Bot,
  Send,
  AlertTriangle,
  BookOpen,
  ShieldCheck,
  Clock,
  User,
  Trash2,
  HelpCircle,
} from 'lucide-react';

export const AiAdvisorTab: React.FC = () => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        'Kính chào Quý vị. Tôi là Trợ lý Tra cứu Dữ liệu Di sản & Pháp lý. Tôi CHỈ trả lời dựa trên dữ liệu có sẵn trong ứng dụng. Nếu nội dung Quý vị hỏi không nằm trong dữ liệu ứng dụng, tôi sẽ trả lời "Ứng dụng chưa có thông tin này" và gợi ý nguồn chính thống để đối chiếu.',
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      referencedRecord: 'Cơ sở dữ liệu & Quy chuẩn trong ứng dụng',
      referencedSource: 'Hồ sơ UNESCO số 01064 & Luật Tín ngưỡng, tôn giáo 2016',
      isWarning: false,
      isAiGenerated: false,
    },
  ]);
  const [inputQuestion, setInputQuestion] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const suggestedQuestions = [
    'Hiện tượng tự nhận là căn quả phải làm lễ cắt âm/giải hạn hàng chục triệu đồng có phải là biến tướng không?',
    'Nghi lễ Lên đồng trong Tín ngưỡng thờ Mẫu Tam phủ có những đặc trưng chuẩn mực gì?',
    'Hát Chầu Văn của người Việt có nguồn tư liệu và nghệ nhân tiêu biểu nào?',
    'Lễ hội Phủ Dầy tôn vinh vị Thánh Mẫu nào và tình trạng ghi danh ra sao?',
    'Đền Ngọc Sơn ở Hoàn Kiếm có thông tin trong ứng dụng không?',
  ];

  const handleSendMessage = async (questionToSend?: string) => {
    const q = (questionToSend || inputQuestion).trim();
    if (!q || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: q,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuestion('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q }),
      });

      const data = await res.json();

      if (data.success) {
        const assistantMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: data.answer,
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
          referencedRecord: data.referencedRecord,
          referencedSource: data.referencedSource,
          isWarning: data.isWarning,
          isAiGenerated: Boolean(data.isAiGenerated),
          isUnverified: Boolean(data.isUnverified),
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } else {
        const errorMsg: ChatMessage = {
          id: `ai-err-${Date.now()}`,
          role: 'assistant',
          content: `Không thể kết nối máy chủ tra cứu: ${data.message || 'Lỗi không xác định'}`,
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
          referencedRecord: 'Lỗi phản hồi',
          referencedSource: 'Hệ thống',
          isWarning: true,
        };
        setMessages((prev) => [...prev, errorMsg]);
      }
    } catch {
      const errorMsg: ChatMessage = {
        id: `ai-err-${Date.now()}`,
        role: 'assistant',
        content: 'Đã xảy ra lỗi mạng khi gửi câu hỏi. Quý vị vui lòng thử lại sau.',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        referencedRecord: 'Lỗi mạng',
        referencedSource: 'Hệ thống máy chủ',
        isWarning: true,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content:
          'Cuộc trò chuyện đã được làm mới. Mời Quý vị đặt câu hỏi tra cứu dựa trên dữ liệu có sẵn trong ứng dụng.',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        referencedRecord: 'Cơ sở dữ liệu trong ứng dụng',
        referencedSource: 'Hồ sơ UNESCO & Khung Pháp lý',
        isWarning: false,
      },
    ]);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#7a1717] via-[#912020] to-[#591010] text-white p-5 sm:p-8 rounded-2xl shadow-xl border-2 border-amber-500/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-200 text-xs font-semibold mb-2 border border-amber-400/30">
              <Bot className="w-3.5 h-3.5 text-amber-300" />
              Trợ Lý Tra Cứu Dữ Liệu Di Sản (Gemini Backend Proxy)
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif-culture text-amber-100">
              Trợ Lý Tra Cứu Thông Minh
            </h2>
            <p className="text-base text-amber-100/90 mt-2 max-w-2xl leading-relaxed">
              Gemini chỉ trả lời dựa trên dữ liệu sẵn có trong ứng dụng và luôn ghi kèm tên nguồn đã dùng. Nếu dữ liệu không có, hệ thống trả lời <strong>&ldquo;Ứng dụng chưa có thông tin này&rdquo;</strong> kèm gợi ý nguồn chính thống.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={clearChat}
              className="inline-flex items-center gap-1.5 px-4 min-h-[44px] rounded-xl bg-white/15 hover:bg-white/25 text-base font-medium text-amber-100 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Làm mới hội thoại</span>
            </button>
          </div>
        </div>
      </div>

      {/* Suggested Questions Grid */}
      <div className="bg-amber-50/80 p-4 sm:p-5 rounded-2xl border border-amber-200 space-y-3">
        <div className="flex items-center gap-2 text-sm font-bold text-amber-950 uppercase tracking-wide">
          <HelpCircle className="w-4 h-4 text-amber-700 shrink-0" />
          <span>Câu hỏi gợi ý tra cứu nhanh:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              type="button"
              disabled={loading}
              onClick={() => handleSendMessage(q)}
              className="text-left text-base bg-white hover:bg-amber-100/80 text-gray-800 hover:text-red-950 font-medium px-3.5 py-2 min-h-[44px] rounded-xl border border-amber-200/90 shadow-2xs transition-all disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Container */}
      <div
        ref={chatContainerRef}
        className="bg-white rounded-2xl border border-amber-200 shadow-sm p-4 sm:p-6 min-h-[380px] max-h-[580px] overflow-y-auto space-y-4"
      >
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 sm:gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm ${
                  isUser
                    ? 'bg-amber-600 text-white'
                    : 'bg-[#7a1717] text-amber-300 border border-amber-400/50'
                }`}
              >
                {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[88%] sm:max-w-[82%] min-w-0 rounded-2xl p-4 text-base space-y-3 shadow-xs ${
                  isUser
                    ? 'bg-[#881c1c] text-white rounded-tr-none'
                    : 'bg-gray-50 border border-amber-200/80 text-gray-800 rounded-tl-none'
                }`}
              >
                {/* Content */}
                <div className="whitespace-pre-line leading-relaxed font-sans break-words">
                  {msg.content}
                </div>

                {/* Grounding Attribution Card */}
                {!isUser && msg.referencedRecord && (
                  <div className="mt-3 pt-3 border-t border-amber-200/60 bg-white/80 p-3 rounded-xl text-base space-y-2">
                    <div className="flex items-start gap-2 font-bold text-amber-950">
                      <BookOpen className="w-4 h-4 text-red-700 shrink-0 mt-1" />
                      <div>
                        <span>Mục đối chiếu: </span>
                        <span className="text-gray-900 font-medium underline">{msg.referencedRecord}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 text-gray-700">
                      <ShieldCheck className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-1" />
                      <div className="break-words min-w-0">
                        <strong className="text-gray-800">Tên nguồn đã dùng: </strong>
                        <span className="italic">{msg.referencedSource || 'Chưa xác định nguồn'}</span>
                      </div>
                    </div>

                    {msg.isAiGenerated && (
                      <div className="flex items-start gap-2 text-sm text-amber-900 bg-amber-50 p-2 rounded-lg border border-amber-200">
                        <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                        <span>
                          Nội dung do Gemini tổng hợp từ dữ liệu trong ứng dụng; phần chi tiết ngoài phạm vi hồ sơ gốc được đánh dấu để kiểm chứng lại theo nguồn dẫn.
                        </span>
                      </div>
                    )}

                    {msg.isWarning && (
                      <div className="flex items-start gap-2 text-sm text-amber-900 font-semibold pt-1">
                        <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                        <span>
                          {msg.isUnverified
                            ? 'Lưu ý: Phần hỏi nằm ngoài dữ liệu hiện có của ứng dụng — vui lòng đối chiếu thêm từ nguồn chính thống.'
                            : 'Lưu ý: Tư liệu đối chiếu có phần cần bổ sung kiểm chứng từ bản gốc.'}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                <div
                  className={`text-xs flex items-center gap-1 ${
                    isUser ? 'text-amber-200/90 justify-end' : 'text-gray-500'
                  }`}
                >
                  <Clock className="w-3 h-3" />
                  <span>{msg.timestamp}</span>
                </div>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#7a1717] text-amber-300 flex items-center justify-center flex-shrink-0 animate-pulse">
              <Bot className="w-5 h-5" />
            </div>
            <div className="bg-gray-50 border border-amber-200 rounded-2xl rounded-tl-none p-4 text-base text-gray-700 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-amber-600 animate-ping"></span>
              <span>Đang tra cứu dữ liệu trong ứng dụng và đối chiếu nguồn...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="flex items-center gap-2 bg-white p-2.5 rounded-2xl border-2 border-amber-300 shadow-md focus-within:border-amber-600"
      >
        <input
          type="text"
          value={inputQuestion}
          onChange={(e) => setInputQuestion(e.target.value)}
          placeholder="Nhập câu hỏi tra cứu trong dữ liệu ứng dụng..."
          disabled={loading}
          className="flex-1 min-w-0 min-h-[44px] px-3 sm:px-4 py-2 text-base bg-transparent focus:outline-none text-gray-800 placeholder-gray-400"
        />
        <button
          type="submit"
          disabled={loading || !inputQuestion.trim()}
          className="inline-flex items-center justify-center gap-2 px-5 min-h-[44px] rounded-xl bg-[#881c1c] hover:bg-[#6b1414] text-white font-bold text-base shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
        >
          <span>Gửi</span>
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
