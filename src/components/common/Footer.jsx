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
    <div className="min-h-[200px] sm:min-h-[300px]">
      <div className="absolute bottom-0 w-full">
        <div className="flex sm:flex-col sm:gap-[20px] sm:items-start items-center justify-between px-[20px] py-[50px] max-w-[1500px] w-full mx-[auto] my-0 border-[#61443A] border-t-[1px] sm:px-[20px]">
          <Link to="/">
            <div className="font-hakgyo text-[1.5rem] text-[#61443A]">CAFEMOA</div>
          </Link>
          <div>
            <ul className="flex gap-[10px] sm:gap-[0px] sm:justify-between">
              {member.map((member, index) => {
                return (
                  <li
                    key={index}
                    className="py-[10px] lg:px-[15px] sm:pr-[15px] lg:border lg:border-[#c9c9c9] lg:border-[1px] rounded-full"
                  >
                    <Link
                      to={member.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex g-[10px] sm:flex-col sm:items-center"
                    >
                      <Github className="sm:hidden" />
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
            <p>SPARTA. 7</p>
          </div>
        </span>
      </div>
    </div>
  );
};
export default Footer;
