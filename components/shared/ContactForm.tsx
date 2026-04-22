'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { contactFormSchema, type ContactFormData } from '@/lib/validation';

interface ContactFormProps {
  servicePreselect?: string;
  onSuccess?: () => void;
}

export default function ContactForm({ servicePreselect, onSuccess }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      service: servicePreselect || '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    // Simulate form processing delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Format message for Messenger
    const serviceLabel = serviceOptions.find(opt => opt.value === data.service)?.label || data.service;
    const message = `Xin chào Tesla Media!\n\n` +
      `Tôi muốn được tư vấn về dịch vụ.\n\n` +
      `📋 Thông tin liên hệ:\n` +
      `👤 Họ tên: ${data.name}\n` +
      `📧 Email: ${data.email}\n` +
      `📱 Số điện thoại: ${data.phone}\n` +
      `🎯 Dịch vụ quan tâm: ${serviceLabel}\n` +
      `${data.message ? `💬 Nội dung: ${data.message}\n` : ''}\n` +
      `Vui lòng liên hệ lại với tôi. Cảm ơn!`;
    
    // Get Facebook Page ID from messenger URL (extract from m.me/teslamediahp1)
    const messengerUrl = `https://m.me/teslamediahp1?text=${encodeURIComponent(message)}`;
    
    // Open Messenger in new tab
    window.open(messengerUrl, '_blank');
    
    console.log('Form data:', data);
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    reset();
    
    if (onSuccess) {
      onSuccess();
    }

    // Hide success message after 5 seconds
    setTimeout(() => {
      setSubmitSuccess(false);
    }, 5000);
  };

  const serviceOptions = [
    { value: 'tich-xanh-fanpage-ca-nhan', label: 'Tích xanh Fanpage & Trang Cá Nhân' },
    { value: 'chay-quang-cao-messenger-livestream', label: 'Chạy Quảng Cáo Messenger & Livestream' },
    { value: 'cham-soc-page', label: 'Chăm sóc Page' },
    { value: 'tang-follow-mat-live', label: 'Tăng Follow & Tăng Mắt Live' },
    { value: 'ngan-sach-chiet-khau', label: 'Ngân Sách Chiết Khấu' },
    { value: 'khoa-hoc-chay-ads', label: 'Khóa Học Chạy Ads Cho Người Mới Bắt Đầu' },
    { value: 'ho-tro-ban-hang-chot-don', label: 'Hỗ Trợ Bán Hàng, Chốt Đơn' },
    { value: 'thiet-ke-landing-page-seo', label: 'Hỗ Trợ Thiết Kế Landing Page' },
    { value: 'cung-cap-nguyen-lieu-facebook', label: 'Cung Cấp Nguyên Liệu Các Dịch Vụ Facebook' },
    { value: 'cho-thue-tai-khoan-quang-cao', label: 'Cho Thuê Tài Khoản Quảng Cáo' },
    { value: 'khac', label: 'Dịch vụ khác' },
  ];

  if (submitSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-green-800 mb-2">
          Đang chuyển đến Messenger!
        </h3>
        <p className="text-green-700">
          Thông tin của bạn đã được chuẩn bị. Vui lòng gửi tin nhắn qua Messenger để chúng tôi có thể hỗ trợ bạn nhanh nhất.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Họ và tên <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          {...register('name')}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors min-h-touch ${
            errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
          }`}
          placeholder="Nhập họ và tên của bạn"
          aria-describedby={errors.name ? 'name-error' : undefined}
          aria-invalid={errors.name ? 'true' : 'false'}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          {...register('email')}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors min-h-touch ${
            errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
          }`}
          placeholder="example@email.com"
          aria-describedby={errors.email ? 'email-error' : undefined}
          aria-invalid={errors.email ? 'true' : 'false'}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Phone Field */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Số điện thoại <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          {...register('phone')}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors min-h-touch ${
            errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300'
          }`}
          placeholder="0901234567"
          aria-describedby={errors.phone ? 'phone-error' : undefined}
          aria-invalid={errors.phone ? 'true' : 'false'}
        />
        {errors.phone && (
          <p id="phone-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* Service Field */}
      <div>
        <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
          Dịch vụ quan tâm <span className="text-red-500">*</span>
        </label>
        <select
          id="service"
          {...register('service')}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors min-h-touch ${
            errors.service ? 'border-red-300 bg-red-50' : 'border-gray-300'
          }`}
          aria-describedby={errors.service ? 'service-error' : undefined}
          aria-invalid={errors.service ? 'true' : 'false'}
        >
          <option value="">Chọn dịch vụ</option>
          {serviceOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.service && (
          <p id="service-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.service.message}
          </p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Nội dung
        </label>
        <textarea
          id="message"
          rows={4}
          {...register('message')}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-vertical min-h-touch ${
            errors.message ? 'border-red-300 bg-red-50' : 'border-gray-300'
          }`}
          placeholder="Mô tả chi tiết nhu cầu của bạn..."
          aria-describedby={errors.message ? 'message-error' : undefined}
          aria-invalid={errors.message ? 'true' : 'false'}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-medium transition-colors min-h-touch ${
          isSubmitting
            ? 'opacity-70 cursor-not-allowed'
            : 'hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:outline-none'
        }`}
        aria-describedby="submit-status"
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true"></div>
            <span>Đang xử lý...</span>
          </div>
        ) : (
          'Gửi thông tin'
        )}
      </motion.button>

      {/* Status message for screen readers */}
      <div id="submit-status" className="sr-only" aria-live="polite">
        {isSubmitting ? 'Đang gửi form' : ''}
      </div>

      {/* Privacy Notice */}
      <p className="text-xs text-gray-500 text-center">
        Bằng cách gửi form này, bạn đồng ý với{' '}
        <a href="/chinh-sach-bao-mat" className="text-primary-600 hover:underline">
          Chính sách bảo mật
        </a>{' '}
        của Tesla Media.
      </p>
    </form>
  );
}