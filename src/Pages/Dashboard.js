import axios from "axios";
import { Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement,ArcElement, Tooltip, Legend } from "chart.js";
import { FiPieChart } from 'react-icons/fi';
import { BsTags } from 'react-icons/bs';
import { MdKeyboardArrowRight, MdOutlineScheduleSend } from 'react-icons/md';
import {GoSearch} from "react-icons/go";
import { FaRegUserCircle } from 'react-icons/fa';
import { MdOutlineSettings } from 'react-icons/md';
import { BiBell } from 'react-icons/bi';
import { IoIosSearch } from 'react-icons/io';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { AiOutlineLike } from 'react-icons/ai';
import { FiUsers } from 'react-icons/fi';
import "../CssFiles/Dashboard.css";
import { useState, useEffect } from "react";


ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement, 
  Tooltip, 
  Legend
)

const Dashboard = () => {

  const [search, setSearch] = useState('')
  const [information, setInformation] = useState([]);
  const [buttonClicked, setButtonClicked] = useState([]);
  const [graphdata, setGraphdata] = useState({});
  const [pie,setPie] = useState({});
  const [click,setClick] = useState(false);


  const myStyle = {
    display: buttonClicked ? "block" : "none",
  };

  

  // const handleApi = () => {
  //   axios.get(`https://api.coincap.io/v2/assets/${search}`)
  //     .then((res) => {
  //       setInformation(res.data.data.json());
  //     })
  // };
  useEffect(() => {
    axios.get(`https://api.coincap.io/v2/assets/${search}`)
      .then(response => response.data.data)
      .then(data => setInformation(data))
      .catch(error => console.error(error));
  }, []);

  // useEffect(() => {
  //   if(search !== '') {
  //     handleApi();
  //   }
  // }, [search])
  const info = JSON.stringify(information)
  const df = JSON.parse(info)

  const handleClick = () => {
    setClick(true)
  // Number(data[0]["supply"])
    setButtonClicked(df);
    const data1 = {
      labels: ["Week 1", "Week2", "Week3", "Week 4"],
      datasets: [{
        label: 'Line 1',
        data: [df[0]["supply"], df[1]["supply"],df[2]["supply"],df[3]["maxSupply"]],
        backgroundcolor: "transparent",
        borderColor: "Black",
        tension: 0.5,
      },
      {
        label: 'Line 2',
        data: [df[4]["supply"],df[6]["maxSupply"],df[7]["supply"],df[5]["maxSupply"]],
        backgroundcolor: "transparent",
        borderColor: "Blue",
        tension: 0.5,
      }]
  
    }
    setGraphdata(data1)
    const Piedata = {
      labels: ['Red', 'Blue', 'Yellow'],
      datasets: [
        {
          label: '# of Votes',
          data: [df[0]["supply"],df[0]["maxSupply"],df[1]["supply"]],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1,
        },
      ],
    }
    setPie(Piedata)
  
    
  };
 


  return (
    <div className='Container'>
      <div className="left">
        <h1>Board.</h1>
        <p><FiPieChart />  <span>Dashboard</span></p>
        <p><BsTags />  <span>Transactions</span></p>
        <p><MdOutlineScheduleSend />  <span>Schedules</span></p>
        <p><FaRegUserCircle />  <span>Users</span></p>
        <p><MdOutlineSettings />  <span>Settings</span></p>

        <div className='left-footer'>
          <p>Help</p>
          <p>Contact Us</p>
        </div>

      </div>

      <div className='right'>
        <div className='right-head'>
          <h1>Dashboard</h1>
          <div className="right-head2">
            <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)}></input>
            <button onClick={handleClick}><GoSearch/></button>
            <BiBell />
            <img src="../favicon.ico" />
          </div>
        </div>

        <div className='right-top'>
          <div class="box">

            <div className="icon"><FaRegMoneyBillAlt /></div>
            <div className="text">
              <p>Total Revenues</p>
              {click ? <p className="data">{Number(buttonClicked[0]["supply"])}</p> :
              <p></p> }
            </div>
              
          </div>
          <div class="box">
            <div className="icon"><BsTags /></div>
            <div className="text">
              <p>Total Transactions</p>
              {click ?<p className="data">{Number(buttonClicked[0]["vwap24Hr"]).toFixed(0)}</p> :
              <p></p>}
            </div>
          </div>
          <div class="box">
            <div className="icon"><AiOutlineLike /></div>
            <div className="text">
              <p>Total Likes</p>
              {click ?<p className="data">{Number(buttonClicked[0]["rank"])}</p> :
              <p></p>}
            </div>
          </div>
          <div class="box">
            <div className="icon"><FiUsers /></div>
            <div className="text">
              <p>Total Users</p>
              {click ?<p className="data">{Number(buttonClicked[0]["maxSupply"])}</p> :
              <p></p>}
            </div>
          </div>
        </div>

        <div className="right-middle">
        {click && <Line  width= '850px' data={graphdata }></Line> }
        </div>

        <div className="right-bottom">
          <div className="top-products details">
            <div className="top-products1">
              <h3>Top products</h3>
              
              <select>
                <option>May - June 2021</option>
                <option>June - July 2021</option>
                <option>July - August 2021</option>
              </select>
              {click && <Pie width= "200px" data={pie} /> }
            </div>
          </div>

          <div className="today-schedule details">
            <div className="today-schedule1">
              <h3>Today's schedule</h3>
              <p>See All <MdKeyboardArrowRight /></p>
            </div>
          </div>
        </div>

      </div>


    </div>
  )
}

export default Dashboard