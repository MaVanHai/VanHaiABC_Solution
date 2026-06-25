import React from "react";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

function Contact() {
    return (
        <>
            <Header />

            <section className="min-h-screen bg-slate-50 py-16">

                <div className="mx-auto max-w-7xl px-4">

                    <div className="mb-12 text-center">

                        <h1 className="text-5xl font-bold text-slate-800">
                            Liên hệ với chúng tôi
                        </h1>

                        <p className="mt-4 text-lg text-slate-600">
                            Chúng tôi luôn sẵn sàng hỗ trợ và tư vấn sản phẩm.
                        </p>

                    </div>

                    <div className="grid gap-10 lg:grid-cols-2">

                        {/* Thông tin liên hệ */}
                        <div className="rounded-3xl bg-white p-8 shadow">

                            <h2 className="mb-6 text-2xl font-bold">
                                Thông tin liên hệ
                            </h2>
                            <div className="mt-8">

                                <h3 className="mb-4 text-xl font-bold">
                                    Vị trí cửa hàng
                                </h3>

                                <div className="overflow-hidden rounded-2xl border">

                                    <iframe
                                        title="Google Map IoT Shop"
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31348.732983809095!2d106.74322487431637!3d10.8425314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175270d781ae2ef%3A0xc945b145cc8466eb!2zSFRQcm8gR2nhuqNpIHBow6FwIGPDtG5nIG5naOG7hyAtIExpbmgga2nhu4duIMSRaeG7h24gdOG7rQ!5e0!3m2!1svi!2s!4v1781751507468!5m2!1svi!2s"
                                        width="100%"
                                        height="450"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    />
                                </div>

                            </div>
                            <div className="space-y-5">

                                <div>
                                    <h3 className="font-semibold">
                                        Địa chỉ
                                    </h3>

                                    <p className="text-slate-600">
                                        123 Nguyễn Huệ, Quận 1,
                                        TP. Hồ Chí Minh
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-semibold">
                                        Điện thoại
                                    </h3>

                                    <p className="text-slate-600">
                                        0123 456 789
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-semibold">
                                        Email
                                    </h3>

                                    <p className="text-slate-600">
                                        support@iotshop.vn
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-semibold">
                                        Giờ làm việc
                                    </h3>

                                    <p className="text-slate-600">
                                        Thứ 2 - Thứ 7
                                    </p>

                                    <p className="text-slate-600">
                                        08:00 - 17:30
                                    </p>
                                </div>

                            </div>

                        </div>

                        {/* Form liên hệ */}
                        <div className="rounded-3xl bg-white p-8 shadow">

                            <h2 className="mb-6 text-2xl font-bold">
                                Gửi tin nhắn
                            </h2>

                            <form>

                                <div className="mb-4">
                                    <label className="mb-2 block font-medium">
                                        Họ tên
                                    </label>

                                    <input
                                        type="text"
                                        className="w-full rounded-xl border p-3"
                                        placeholder="Nhập họ tên"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="mb-2 block font-medium">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        className="w-full rounded-xl border p-3"
                                        placeholder="Nhập email"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="mb-2 block font-medium">
                                        Tiêu đề
                                    </label>

                                    <input
                                        type="text"
                                        className="w-full rounded-xl border p-3"
                                        placeholder="Nhập tiêu đề"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label className="mb-2 block font-medium">
                                        Nội dung
                                    </label>

                                    <textarea
                                        rows="5"
                                        className="w-full rounded-xl border p-3"
                                        placeholder="Nhập nội dung liên hệ..."
                                    />
                                </div>

                                <button
                                    type="button"
                                    className="w-full rounded-xl bg-emerald-500 py-3 font-semibold text-white hover:bg-emerald-600"
                                    onClick={() =>
                                        alert(
                                            "Chức năng đang phát triển"
                                        )
                                    }
                                >
                                    Gửi liên hệ
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </section>

            <Footer />
        </>
    );
}

export default Contact;