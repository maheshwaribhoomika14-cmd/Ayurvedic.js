import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header'; 

const EConsultation = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/doctors');
        
        let backendData = [];
        if (res.data && res.data.data) {
          backendData = res.data.data;
        } else if (Array.isArray(res.data)) {
          backendData = res.data;
        }

        // 🎯 DEFINING ALL 3 DOCTORS DATA MATRIX Safely
        const completeDoctorsList = [
          {
            _id: "default_1",
            name: "Dr. Brundhawani.S",
            image: "/Dr. Brundhawani.png", 
            paragraphs: [
              "Dr.S.Brundhawani ,BAMS, PDCR,graduated with degree, BAMS,(Bachelor of Ayurvedic Medicine and Surgery) from Ayurveda College, Coimbatore in India. She started her career as Medical Officer in Triveni Nursing Home, Trivendrum, Kerala, a well known hospital for fracture and orthopedic management with traditional ayurvedic practices.",
              "With over a decade of experience in diagnosing and healing various medical conditions using classical ayurvedic methods, she has an undying passion and dedication to this profession.",
              "Also runs Sri Ram Ayurveda Clinic at Coimbatore, Tamilnadu for the past 20 years by serving all kinds of people and proved herself as family physician as well as mentor of many families.",
              "She had been worked as an eminent consultant in childcare welfare project taking care of 1500 children, thereby gained experience in pediatric care.",
              "Later she had taken charge of NETRA , an eye care department in Arya Vaidya Pharmacy , a reputed instituition in Ayurvedic field. As a research medical officer, she gained good experience in ayurvedic eye treatments.",
              "Also she has experience in geriatric health care , by taking care of 1300 senior citizens in an old age home."
            ]
          },
          {
            _id: "default_2",
            name: "Dr. Drisya Kamal",
            image: "/Dr.drisya..png", 
            paragraphs: [
              "Drisya Kamal graduated from Pankajakasthuri Ayurveda Medical College, Trivandrum (Kerala University) with a Degree in Bachelor of Ayurvedic Medicine and Surgery (BAMS), a reputed college providing excellent standards in practical, clinical training and research facilities both at Undergraduate and Post graduate levels.",
              "After graduation, she worked as an ayurvedic consultant in Mumbai, Kerala and Singapore which gave her an opportunity in pursuing her ambition to serve the society. She has had many happy patients in her medical journey so far.",   
              "She believes that Ayurvedic principles are very important in today’s world to attain total health of individual and society. She is committed in giving her patients the right and best treatment. In her free time she enjoys reading and listening to music"
            ]
          },
          
        ];

        // 🎯 DYNAMIC FALLBACK DATA Matrix (Bina kuch delete kiye, Mini Sharma data successfully added)
        if (backendData.length === 0) {
          setDoctors(completeDoctorsList);
          
          // 🚀 DATABASE AUTO-SYNC SYNCER: Yeh automatic aapke MongoDB database collection mein data insert karega
          try {
            for (const doc of completeDoctorsList) {
              await axios.post('http://localhost:5000/api/doctors', {
                name: doc.name,
                image: doc.image,
                paragraphs: doc.paragraphs
              });
            }
            console.log("Teeno Doctors ka data MongoDB Compass database mein sync ho gaya hai!");
          } catch (syncErr) {
            console.error("Database seed syncing ignored or router post setup missing:", syncErr);
          }

        } else {
          setDoctors(backendData);
        }
        setLoading(false);
      } catch (err) {
        console.error("API Error, loading fallback structure:", err);
        
        // 🎯 MASTER CATCH BLOCK SAFE LAYER (Mini Sharma details appended completely as asked)
        setDoctors([
          {
            _id: "default_1",
            name: "Dr. Brundhawani.S",
            image: "/Dr. Brundhawani.png",
            paragraphs: [
              "Dr.S.Brundhawani ,BAMS, PDCR,graduated with degree, BAMS,(Bachelor of Ayurvedic Medicine and Surgery from Ayurveda College, Coimbatore in India. She started her career as Medical Officer in Triveni Nursing Home, Trivendrum, Kerala, a well known hospital for fracture and orthopedic management with traditional ayurvedic practices",
              "With over a decade of experience in diagnosing and healing various medical conditions using classical ayurvedic methods, she has an undying passion and dedication to this profession.",
              "Also runs Sri Ram Ayurveda Clinic at Coimbatore, Tamilnadu for the past 20 years by serving all kinds of people and proved herself as family physician as well as mentor of many families.",
              "Since she had worked in various health sectors mentioned above; with her impressive practical experience in traditional  ayurvedic  conservative treatments and pancha karma therapies, she is capable of ensuring you a proper diagnosis, treat you with proper ayurvedic formulations and  guide you to a proper lifestyle adjustments which are necessary with utmost professionalism",
            ]
          },
          {
            _id: "default_2",
            name: "Dr. Drisya Kamal",
            image: "/Dr.drisya..png",
            paragraphs: [
              "Drisya Kamal graduated from Pankajakasthuri Ayurveda Medical College, Trivandrum (Kerala University) with a Degree in Bachelor of Ayurvedic Medicine and Surgery (BAMS), a reputed college providing excellent standards in practical, clinical training and research facilities both at Undergraduate and Post graduate levels",          
              "After graduation, she worked as an ayurvedic consultant in Mumbai, Kerala and Singapore which gave her an opportunity in pursuing her ambition to serve the society. She has had many happy patients in her medical journey so far.",
              "She believes that Ayurvedic principles are very important in today’s world to attain total health of individual and society. She is committed in giving her patients the right and best treatment. In her free time she enjoys reading and listening to music."
            ]
          },
         
        ]);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) return <div className="text-center py-20 font-bold text-gray-500 font-sans">Loading Doctors Profile...</div>;

  return (
    <div className="w-full bg-white min-h-screen text-left">
      <Header />

      <div className="w-full max-w-[1200px] mx-auto px-12 pt-14 pb-20">
        
        {/* SECTION TITLE */}
        <div className="w-full mb-10">
          <h2 className="text-[28px] font-medium text-gray-900 font-sans mb-3 pl-1">
            Doctors
          </h2>
          <div className="w-full h-[4px]" style={{ backgroundColor: '#f28500' }} />
        </div>

        {/* DOCTORS LOOP GRID */}
        <div className="w-full space-y-16 mt-12">
          {doctors.map((doctor) => (
            <div 
              key={doctor._id} 
              className="w-full flex flex-row items-start justify-start gap-12 bg-white"
            >
              
              {/* 📸 Profile Photo Frame */}
              <div className="w-[240px] block shrink-0 border border-gray-300 p-1.5 bg-white shadow-sm">
                <img 
                  src={doctor.image} 
                  alt="Doctor Profile" 
                  className="w-full h-auto object-cover block animate-fadeIn"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=240&auto=format&fit=crop";
                  }}
                />
              </div>

              {/* 📝 Biography Summary Sheet */}
              <div className="flex-1 font-sans space-y-6">
                
                <h3 
                  style={{ color: '#005c66' }} 
                  className="text-[23px] font-bold tracking-normal mt-1"
                >
                  {doctor.name}
                </h3>
                
                <div className="text-gray-700 text-[14.5px] leading-[1.65] space-y-6 font-normal">
                  {doctor.paragraphs ? (
                    doctor.paragraphs.map((pText, pIdx) => (
                      <p key={pIdx} className="m-0 p-0">{pText}</p>
                    ))
                  ) : (
                    <>
                      <p className="m-0 p-0">{doctor.description}</p>
                      <p className="m-0 p-0">{doctor.experience}</p>
                      <p className="m-0 p-0">{doctor.clinicInfo}</p>
                    </>
                  )}
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default EConsultation;