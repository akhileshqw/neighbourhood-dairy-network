import React from "react";

const AboutUs = () => {
  return (
    <>
      {/* Hero Banner Section */}
      <div
        style={{
          position: "relative",
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        <span
          style={{
            fontSize: "50px",
            fontWeight: "bold",
            color: "#fff",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
          }}
        >
          Our Story
        </span>
        <img
          src="./background.jpg"
          alt="Our Story Background"
          style={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
            maxHeight: "360px",
          }}
        />
      </div>

      {/* Welcome Section */}
      <div style={{ padding: "40px 20px", backgroundColor: "#f9f9f9" }}>
        <h1
          style={{
            textAlign: "center",
            fontSize: "36px",
            fontWeight: "600",
            marginBottom: "20px",
            color: "#444",
          }}
        >
          Welcome to Neighbourhood Diary Network
        </h1> 
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            fontSize: "18px",
            lineHeight: "1.8",
            color: "#666",
          }}
        >
          <p style={{ marginBottom: "20px" }}>
            Neighbourhood Diary Network is a public limited company having its registered
            and corporate office at Hyderabad City of Telangana State in India.
            The company was incorporated in the year 1995 and production
            commenced in 1998. Currently, our procurement spans 5 states, and we
            delight our customers through our products in 11 states. We operate
            around 150 milk chilling centres and 14 processing plants. Of these
            plants, nine are ISO 22000:2018 certified, five are FSSC 22000 v5.1
            certified and hold ISO 50001:2011 (EnMS) certification.
          </p>
          <p style={{ marginBottom: "20px" }}>
            Our distribution and marketing operations include distributing our
            products through more than 75 sales offices, around 2500 agents, and
            approximately 2000 distributors across 11 states in India.
            Additionally, as of March 31st, 2024, our milk and dairy-based VAPs
            are also available through more than 600 “Dodla Retail Parlours,”
            which commenced operations in 2016 and are spread across Andhra
            Pradesh, Telangana, Tamil Nadu, and Karnataka.
          </p>
          <p style={{ marginBottom: "20px" }}>
            Our product portfolio includes Milk, UHT Milk, Curd, Ice Cream,
            Ghee, Paneer, Buttermilk, Lassi, Flavored Milk, Sweets, and Cooking
            Butter. These products are conveniently packed to suit various needs
            of its consumers.
          </p>
        </div>
      </div>

      {/* Vision and Mission Section */}
      <div style={{ padding: "40px 20px", backgroundColor: "#fff" }}>
        <h1
          style={{
            textAlign: "center",
            fontSize: "36px",
            fontWeight: "600",
            marginBottom: "20px",
            color: "#444",
          }}
        >
          Our Vision and Mission
        </h1>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          {/* Vision */}
          <div
            style={{
              flex: "1 1 30%",
              maxWidth: "300px",
              textAlign: "center",
            }}
          >
            <img
              src="/vision.jpg"
              alt="Vision"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            />
            <p
              style={{
                fontWeight: "bold",
                marginTop: "10px",
                fontSize: "16px",
              }}
            >
              Our Vision
            </p>
          </div>

          {/* Mission */}
          <div
            style={{
              flex: "1 1 30%",
              maxWidth: "300px",
              textAlign: "center",
            }}
          >
            <img
              src="/mission.jpg"
              alt="Mission"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            />
            <p
              style={{
                fontWeight: "bold",
                marginTop: "10px",
                fontSize: "16px",
              }}
            >
              Our Core Values
            </p>
          </div>

          {/* Core Values */}
          <div
            style={{
              flex: "1 1 30%",
              maxWidth: "300px",
              textAlign: "center",
            }}
          >
            <img
              src="/abc.jpg"
              alt="Core Values"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            />
            <p
              style={{
                fontWeight: "bold",
                marginTop: "10px",
                fontSize: "16px",
              }}
            >
              Our Mission
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
