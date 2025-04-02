import React, { useState, useRef, useEffect, RefCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { gsap } from 'gsap';
import 'swiper/css';
import 'swiper/css/navigation';
import { periods } from './constants';
import {
    Container,
    HistoricalDatesLabel,
    CircleContainer,
    CircleWrapper,
    GlobalLinesContainer,
    CentralCrossLine,
    LeftVerticalLine,
    YearDisplay,
    YearNumber,
    PointsContainer,
    PeriodPoint,
    PointNumberWrapper,
    PointNumber,
    StaticPeriodLabel,
    EventsGroup,
    EventContainer,
    EventItem,
    EventYear,
    EventDescription,
    YearSliderContainer,
    YearSliderWrapper,
    PrevSliderButton,
    NextSliderButton,
    NavigationWrapper,
    SlideCounter,
    NavButtons,
    NavButton
  } from './styles';

const TimelineSlider = () => {
  const [activePeriod, setActivePeriod] = useState(0);
  const [displayPeriod, setDisplayPeriod] = useState(0);
  const [displayStartYear, setDisplayStartYear] = useState(periods[0].startYear);
  const [displayEndYear, setDisplayEndYear] = useState(periods[0].endYear);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const yearSwiperRef = useRef<any>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const pointsContainerRef = useRef<HTMLDivElement>(null);
  const yearStartRef = useRef<HTMLDivElement>(null);
  const yearEndRef = useRef<HTMLDivElement>(null);
  const pointsRef = useRef<(HTMLDivElement | null)[]>([]);

  const pointAngles = [315, 15, 75, 135, 195, 255];
  const numberAngles = [0, 60, 120, 180, 240, 300];

  const updateNavigationState = () => {
    if (yearSwiperRef.current) {
      setIsBeginning(yearSwiperRef.current.swiper.isBeginning);
      setIsEnd(yearSwiperRef.current.swiper.isEnd);
    }
  };

  const setPointRef: (index: number) => RefCallback<HTMLDivElement> = (index) => (el) => {
    pointsRef.current[index] = el;
  };

  useEffect(() => {
    gsap.set([contentRef.current, labelRef.current], { opacity: 1 });
    updateNavigationState();
  }, []);

  const changePeriod = (newPeriod: number) => {
    if (isAnimating || newPeriod === activePeriod) return;
    setIsAnimating(true);
  
    const currentPoint = pointsRef.current[activePeriod];
    const nextPoint = pointsRef.current[newPeriod];
    const targetStart = periods[newPeriod].startYear;
    const targetEnd = periods[newPeriod].endYear;
    const newAngle = pointAngles[newPeriod] - 315;
  
    const tl = gsap.timeline({
      onComplete: () => {
        setActivePeriod(newPeriod);
        setIsAnimating(false);
      }
    });
  
    if (currentPoint) {
      tl.to(currentPoint, {
        width: 16,
        height: 16,
        backgroundColor: "#42567A",
        border: "none",
        margin: "-8px 0 0 -8px",
        duration: 0.1,
        ease: "none"
      });
    }
  
    tl.to([contentRef.current, labelRef.current, `.point-number-${activePeriod}`], {
      opacity: 0,
      duration: 0.15,
      ease: "power2.inOut",
      onComplete: () => setDisplayPeriod(newPeriod)
    }, "<"); 
  
    tl.add(() => {
      gsap.to(pointsContainerRef.current, {
        rotation: -newAngle,
        duration: 0.7,
        ease: "power2.inOut",
        transformOrigin: "center center"
      });
  
      gsap.to(yearStartRef.current, {
        innerText: targetStart,
        duration: 0.7,
        snap: { innerText: 1 },
        ease: "power2.inOut",
        onUpdate: function() {
          setDisplayStartYear(Math.floor(Number(this.targets()[0].innerText)));
        }
      });
  
      gsap.to(yearEndRef.current, {
        innerText: targetEnd,
        duration: 0.7,
        snap: { innerText: 1 },
        ease: "power2.inOut",
        onUpdate: function() {
          setDisplayEndYear(Math.floor(Number(this.targets()[0].innerText)));
        }
      });
    }, ">");
  
    tl.add(() => {
      if (!nextPoint) return;
  
      gsap.to(nextPoint, {
        width: 40,
        height: 40,
        backgroundColor: "#FFFFFF",
        border: "2px solid #42567A",
        margin: "-20px 0 0 -20px",
        duration: 0.2,
        ease: "power2.out"
      });
  
      gsap.fromTo(`.point-number-${newPeriod}`, 
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.2,
          ease: "power2.out"
        }
      );
  
      gsap.to([contentRef.current, labelRef.current], {
        opacity: 1,
        duration: 0.15,
        ease: "power2.inOut"
      });
    }, "+=0.4");
  
    return tl;
  };

  return (
    <>
      <GlobalLinesContainer>
        <CentralCrossLine orientation="horizontal" />
        <CentralCrossLine orientation="vertical" />
        <LeftVerticalLine />
      </GlobalLinesContainer>

      <Container>
        <HistoricalDatesLabel>Исторические даты</HistoricalDatesLabel>
        <CircleContainer>
          <CircleWrapper>
            <YearDisplay>
              <YearNumber ref={yearStartRef} color="#3877EE">
                {displayStartYear}
              </YearNumber>
              <YearNumber ref={yearEndRef} color="#FF1493">
                {displayEndYear}
              </YearNumber>
            </YearDisplay>
            
            <PointsContainer ref={pointsContainerRef}>
            {pointAngles.map((angle, index) => (
                <React.Fragment key={index}>
                  <PeriodPoint 
                    ref={setPointRef(index)}
                    angle={angle} 
                    active={index === activePeriod}
                    onClick={() => changePeriod(index)}
                  />
                  {index === activePeriod && (
                    <PointNumberWrapper 
                      angle={angle}
                      className={`point-number-${index}`}
                    >
                      <PointNumber $angle={numberAngles[index]}>
                        {String(index + 1).padStart(2, '0')}
                      </PointNumber>
                    </PointNumberWrapper>
                  )}
                </React.Fragment>
              ))}
            </PointsContainer>

            <StaticPeriodLabel ref={labelRef}>
              {periods[displayPeriod].group}
            </StaticPeriodLabel>
          </CircleWrapper>
        </CircleContainer>

        <NavigationWrapper>
          <SlideCounter>
            {String(displayPeriod + 1).padStart(2, '0')}/{String(periods.length).padStart(2, '0')}
          </SlideCounter>
          <NavButtons>
            <NavButton 
              onClick={() => changePeriod(displayPeriod - 1)}
              disabled={displayPeriod === 0 || isAnimating}
            >
              ←
            </NavButton>
            <NavButton 
              onClick={() => changePeriod(displayPeriod + 1)}
              disabled={displayPeriod === periods.length - 1 || isAnimating}
            >
              →
            </NavButton>
          </NavButtons>
        </NavigationWrapper>

        <div ref={contentRef}>
          <EventsGroup>
            <YearSliderContainer>
              <YearSliderWrapper>
                <PrevSliderButton 
                  onClick={() => yearSwiperRef.current?.swiper.slidePrev()}
                  disabled={isBeginning}
                >
                  ←
                </PrevSliderButton>
                
                <Swiper
                  ref={yearSwiperRef}
                  spaceBetween={30}
                  slidesPerView={3}
                  modules={[Navigation]}
                  onSlideChange={updateNavigationState}
                  onInit={updateNavigationState}
                >
                  {periods[displayPeriod].events.map((event, index) => (
                    <SwiperSlide key={index}>
                      <EventContainer>
                        <EventItem>
                          <EventYear>{event.year}</EventYear>
                          <EventDescription>{event.description}</EventDescription>
                        </EventItem>
                      </EventContainer>
                    </SwiperSlide>
                  ))}
                </Swiper>

                <NextSliderButton 
                  onClick={() => yearSwiperRef.current?.swiper.slideNext()}
                  disabled={isEnd}
                >
                  →
                </NextSliderButton>
              </YearSliderWrapper>
            </YearSliderContainer>
          </EventsGroup>
        </div>
      </Container>
    </>
  );
};

export default TimelineSlider;