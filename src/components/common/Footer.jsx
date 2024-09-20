import { Link, useNavigate } from 'react-router-dom';
import { Github } from 'lucide-react';
const member = [
  {
    name: '김태현',
    link: 'https://github.com/derek0k',
  },
  {
    name: '정지형',
    link: 'https://github.com/stopbrother',
  },
  {
    name: '안수영',
    link: 'https://github.com/soo0297',
  },
  {
    name: '박준호',
    link: 'https://github.com/PJH-FE',
  },
  {
    name: '임보라',
    link: 'https://github.com/lim-bora',
  },
];

const Footer = () => {
  return (
    <div className="min-h-[200px]">
      <div className="pt-[100px] absolute bottom-0 w-full">
        <div className="flex items-center justify-between py-[50px] max-w-[1500px] w-full mx-[auto] my-0 border-[#61443A] border-t-[1px] sm:px-[20px]">
          <Link to="/">
            <div className="font-hakgyo text-[1.5rem] text-[#61443A]">CAFEMOA</div>
          </Link>
          <div>
            <ul className="flex gap-[10px]">
              {member.map((member, index) => {
                return (
                  <li
                    key={index}
                    className="py-[10px] px-[15px] border border-[#c9c9c9] border-[1px] rounded-full"
                  >
                    <Link
                      to={member.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex g-[10px]"
                    >
                      <Github />
                      <span>{member.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <span className="bg-[#F4EFEB] w-full block p-[5px] sm:px-[20px]">
          <div className="max-w-[1500px] w-full mx-[auto] my-0 flex justify-between text-[#61443A] text-[13px] py-[3px]">
            <p>ⓒ 2024. CAFEMOA. All rights reserved.</p>
            <p>SPASTA. 7</p>
          </div>
        </span>
      </div>
    </div>
  );
};
export default Footer;
