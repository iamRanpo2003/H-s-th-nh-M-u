import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types/heritage';
import { 
  Bot, 
  Send, 
  Sparkles, 
  AlertTriangle, 
  BookOpen, 
  ShieldCheck, 
  Clock, 
  User, 
  CheckCircle2,
  Trash2,
  HelpCircle
} from 'lucide-react';

export const AiAdvisorTab: React.FC = () => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Kính chào Quý vị. Tôi là Trợ lý Tra cứu Văn hóa & Pháp lý Tín ngưỡng Thờ Mẫu Tam phủ. Tôi hoạt động dựa HOÀN TOÀN trên cơ sở dữ liệu hồ sơ chính thống (disan.json) và các văn bản pháp luật hiện hành. Tuyệt đối tôi không tự suy đoán thông tin ngoài tư liệu lưu trữ. Mời Quý vị đặt câu hỏi tra cứu nghi lễ, quy chuẩn hoặc đối chiếu hiện tượng biến tướng.',
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      referencedRecord: 'Cơ sở dữ liệu disan.json & Khung pháp lý',
      referencedSource: 'Hồ sơ UNESCO số 01064 & Luật Tín ngưỡng, tôn giáo 2016',
      isWarning: false,
    },
  ]);
  const [inputQuestion, setInputQuestion] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Suggested prompt quick buttons as per user prompt
  const suggestedQuestions = [
    'Hiện tượng tự nhận là căn quả phải làm lễ cắt âm/giải hạn hàng chục triệu đồng có phải là biến tướng không?',
    'Nghi lễ Lên đồng trong Tín ngưỡng thờ Mẫu Tam phủ có những đặc trưng chuẩn mực gì?',
    'Hát Chầu Văn của người Việt có nguồn tư liệu và nghệ nhân tiêu biểu nào?',
    'Lễ hội Phủ Dầy tôn vinh vị Thánh Mẫu nào và tình trạng ghi danh ra sao?',
    'Tục dâng tiến mã trong đền phủ được quy định như thế nào để tránh lãng phí?',
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
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `ai-err-${Date.now()}`,
        role: 'assistant',
        content: `Đã xảy ra lỗi mạng khi gửi câu hỏi: ${err.message || 'Vui lòng thử lại sau.'}`,
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
        content: 'Cuộc trò chuyện đã được làm mới. Mời Quý vị đặt câu hỏi tiếp theo dựa trên cơ sở dữ liệu disan.json.',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        referencedRecord: 'Cơ sở dữ liệu disan.json',
        referencedSource: 'Hồ sơ UNESCO & Khung Pháp lý',
        isWarning: false,
      },
    ]);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#7a1717] via-[#912020] to-[#591010] text-white p-6 sm:p-8 rounded-2xl shadow-xl border-2 border-amber-500/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-200 text-xs font-semibold mb-2 border border-amber-400/30">
              <Bot className="w-3.5 h-3.5 text-amber-300" />
              Chuyên Gia Tư Vấn Văn Hóa & Pháp Lý AI
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif-culture text-amber-100">
              Trợ Lý Tra Cứu Thông Minh
            </h2>
            <p className="text-xs sm:text-sm text-amber-100/80 mt-1 max-w-2xl leading-relaxed">
              Vận hành bằng mô hình Gemini 3.8 Flash, tra cứu nghiêm ngặt và đối chiếu hoàn toàn dựa trên cơ sở dữ liệu <code>disan.json</code> và văn bản pháp luật. Tuyệt đối không tự suy đoán ngoài tư liệu.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={clearChat}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-amber-200 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Làm mới hội thoại</span>
            </button>
          </div>
        </div>
      </div>

      {/* Suggested Questions Grid */}
      <div className="bg-amber-50/80 p-4 sm:p-5 rounded-2xl border border-amber-200 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-950 uppercase tracking-wide">
          <HelpCircle className="w-4 h-4 text-amber-700" />
          <span>Câu hỏi gợi ý tra cứu nhanh:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              type="button"
              disabled={loading}
              onClick={() => handleSendMessage(q)}
              className="text-left text-xs bg-white hover:bg-amber-100/80 text-gray-800 hover:text-red-950 font-medium px-3 py-1.5 rounded-lg border border-amber-200/90 shadow-2xs transition-all disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Container */}
      <div 
        ref={chatContainerRef}
        className="bg-white rounded-2xl border border-amber-200 shadow-sm p-4 sm:p-6 min-h-[380px] max-h-[560px] overflow-y-auto space-y-4"
      >
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
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
                className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm space-y-2.5 shadow-xs ${
                  isUser
                    ? 'bg-[#881c1c] text-white rounded-tr-none'
                    : 'bg-gray-50 border border-amber-200/80 text-gray-800 rounded-tl-none'
                }`}
              >
                {/* Content */}
                <div className="whitespace-pre-line leading-relaxed font-sans">
                  {msg.content}
                </div>

                {/* Grounding Attribution Card (Mandatory for Assistant responses) */}
                {!isUser && msg.referencedRecord && (
                  <div className="mt-3 pt-3 border-t border-amber-200/60 bg-white/70 p-2.5 rounded-xl text-xs space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-amber-950">
                      <BookOpen className="w-3.5 h-3.5 text-red-700" />
                      <span>Bản ghi trích dẫn:</span>
                      <span className="text-gray-900 font-medium underline">{msg.referencedRecord}</span>
                    </div>

                    <div className="flex items-start gap-1.5 text-gray-600">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-gray-700">Nguồn tư liệu sử dụng: </strong>
                        <span className="italic">{msg.referencedSource || 'Không có nguồn'}</span>
                      </div>
                    </div>

                    {msg.isWarning && (
                      <div className="flex items-center gap-1 text-[11px] text-amber-800 font-semibold pt-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                        <span>Lưu ý: Tư liệu đối chiếu đang được bổ sung hoặc thiếu nguồn xác thực.</span>
                      </div>
                    )}
                  </div>
                )}

                <div className={`text-[10px] flex items-center gap-1 ${isUser ? 'text-amber-200/80 justify-end' : 'text-gray-400'}`}>
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
            <div className="bg-gray-50 border border-amber-200 rounded-2xl rounded-tl-none p-4 text-xs text-gray-600 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-amber-600 animate-ping"></span>
              <span>Đang tra cứu cơ sở dữ liệu disan.json và đối chiếu quy chuẩn pháp lý...</span>
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
          placeholder="Nhập câu hỏi tra cứu nghi lễ hoặc phân định hiện tượng biến tướng..."
          disabled={loading}
          className="flex-1 px-4 py-2 text-xs sm:text-sm bg-transparent focus:outline-none text-gray-800 placeholder-gray-400"
        />
        <button
          type="submit"
          disabled={loading || !inputQuestion.trim()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#881c1c] hover:bg-[#6b1414] text-white font-bold text-xs sm:text-sm shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Gửi</span>
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
