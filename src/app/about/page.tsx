import Container from '@/components/organisms/Container';
import React from 'react';

const About = () => {
    return (
        <Container>
            <div className="p-4 bg-gray-100 rounded-lg shadow-md space-y-4" >
                {/* Dòng 1: Giáo viên hướng dẫn */}
                < div className="text-lg font-semibold text-gray-700" >
                    Giáo viên hướng dẫn: <span className="text-blue-600" > TS. Nguyễn Trọng Phúc </span>
                </div>

                {/* Dòng 2: Danh sách sinh viên */}
                <div className="text-gray-700" >
                    <span className="font-semibold" > Danh sách sinh viên: </span>
                    <ul className="list-disc list-inside mt-2 space-y-1" >
                        <li className="ml-4" >
                            Đỗ Xuân Kiên - <span className="text-sm text-gray-500" > 211212580 </span>
                        </li>
                        <li className="ml-4" >
                            Trương Tuấn Anh  - <span className="text-sm text-gray-500" > 211210127 </span>
                        </li>
                        <li className="ml-4" >
                            Nguyễn Việt Hoàng  - <span className="text-sm text-gray-500" > 211203437 </span>
                        </li>
                        <li className="ml-4" >
                            Nguyễn Công Hiếu  - <span className="text-sm text-gray-500" > 211212220 </span>
                        </li>
                        <li className="ml-4" >
                            Dương Thị Hằng  - <span className="text-sm text-gray-500" > 211211501 </span>
                        </li>
                    </ul>
                </div>

                {/* Dòng 3: Nội dung */}
                <div className="text-gray-700 whitespace-pre-line">
                    <span className="font-semibold">Nội dung: </span>
                    {`Trang web bán sách trực tuyến đã trở thành một phần không thể thiếu trong cuộc sống hiện đại, mang đến sự tiện lợi và hiệu quả cho cả người bán và người mua. Với mục tiêu tạo ra một nền tảng mua sắm sách đơn giản, an toàn, và dễ tiếp cận, chúng tôi tiến hành xây dựng trang web bán sách với đầy đủ các chức năng hỗ trợ từ khâu tìm kiếm, mua bán, đến quản lý đơn hàng. \n
                    Trang web này trình bày chi tiết về đặc tả kỹ thuật của trang web bán sách trực tuyến, bao gồm các yêu cầu chức năng, yêu cầu phi chức năng. Đặc tả này không chỉ giúp định hướng cho quá trình phát triển hệ thống mà còn đóng vai trò là cơ sở để đánh giá hiệu quả của sản phẩm trong quá trình triển khai và sử dụng. \n
                    Với mong muốn đem đến một trải nghiệm mua sắm sách trực tuyến thân thiện, hiệu quả, và đáp ứng tốt nhu cầu của người dùng, chúng tôi hy vọng trang web này sẽ góp phần thúc đẩy văn hóa đọc sách và hỗ trợ tối đa cho các cá nhân và tổ chức trong quá trình tìm kiếm và mua sách.`}
                </div>

            </div>
        </Container>
    );
};

export default About;
