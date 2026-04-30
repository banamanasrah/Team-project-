import { addProductToTheCart } from "../features/cart/cartSlice";
import { useAppDispatch } from "../hooks";
import { formatCategoryName } from "../utils/formatCategoryName";
import { Product } from "../typings";
import toast from "react-hot-toast"; import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// Use standard icons for the Nordic aesthetic
import {
    HiChevronLeft,
    HiOutlineClock,
    HiOutlineUserCircle,
    HiOutlineCheckBadge,
    HiOutlineCurrencyDollar
} from "react-icons/hi2";

// Theme Colors
const plutoBlue = '#67869A'; // Primary action color
const darkText = '#1A1A1A'; // Headlines
const softGrey = '#6B7280'; // Subtext and labels

const ServiceDetailPage = () => {
    // Sets the page background
    useEffect(() => {
        document.body.style.backgroundColor = "#F9FAFB";
        document.body.style.margin = "0";
        document.body.style.fontFamily = "'Inter', sans-serif";
    }, []);

    const styles = {
        wrapper: {
            padding: '40px 60px',
            maxWidth: '1300px',
            margin: '0 auto',
            color: darkText,
        },
        backLink: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: softGrey,
            textDecoration: 'none',
            fontSize: '14px',
            marginBottom: '30px',
            cursor: 'pointer'
        },
        mainLayout: {
            display: 'grid',
            gridTemplateColumns: '1.8fr 1.2fr', // Left side vs Right side
            gap: '50px',
        },
        // LEFT SIDE STYLES
        mainImage: {
            width: '100%',
            height: '400px',
            borderRadius: '24px',
            backgroundColor: '#E5E7EB', // Placeholder grey
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '48px',
            color: softGrey,
        },
        qualityBar: {
            backgroundColor: '#C6D1D9', // The light Pluto Blue from the photo
            padding: '12px 20px',
            borderRadius: '30px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            margin: '30px 0',
            color: plutoBlue,
            fontWeight: '600',
            fontSize: '14px'
        },
        description: {
            lineHeight: '1.7',
            color: '#4B5563',
            fontSize: '16px',
        },
        // RIGHT SIDE STYLES (Book Service Card)
        bookCard: {
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            padding: '35px',
            position: 'sticky', // Makes it float as you scroll
            top: '40px',
            height: 'fit-content',
            boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
        },
        priceBlock: {
            display: 'flex',
            alignItems: 'baseline',
            gap: '5px',
            color: plutoBlue,
            fontSize: '42px',
            fontWeight: '900',
            marginBottom: '5px'
        },
        infoRow: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '15px',
            color: '#4B5563',
            fontSize: '15px'
        },
        bookBtn: {
            width: '100%',
            backgroundColor: plutoBlue,
            color: '#FFFFFF',
            border: 'none',
            padding: '18px',
            borderRadius: '50px',
            fontSize: '16px',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
            marginTop: '25px',
            transition: 'opacity 0.2s',
        },
        // RECOMMENDATIONS STYLES
        recommendations: {
            marginTop: '80px',
            paddingTop: '40px',
            borderTop: '1px solid #E5E7EB',
        },
        recCard: {
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            padding: '20px',
            width: '280px',
            border: '1px solid #F3F4F6',
        },
        miniImage: {
            width: '100%',
            height: '150px',
            borderRadius: '16px',
            backgroundColor: '#E5E7EB',
            marginBottom: '15px'
        }
    };

    const navigate = useNavigate();
    const { id } = useParams();
    const [service, setService] = useState<any>(null);

    useEffect(() => {
        const storedServices = JSON.parse(localStorage.getItem('services') || '[]');
        const foundService = storedServices.find((s: any) => s.id === id);
        setService(foundService);
    }, [id]);

    if (!service) {
        return (
            <div style={styles.wrapper}>
                <div style={styles.backLink} onClick={() => navigate('/services')}>
                    <HiChevronLeft size={16} />
                    Back to Home Services
                </div>
                <h2>Service not found</h2>
            </div>
        );
    }

    return (
        <div style={styles.wrapper}>
            {/* 1. Back to Home Services Link */}
            <div style={styles.backLink} onClick={() => navigate('/services')}>
                <HiChevronLeft size={16} />
                Back to Home Services
            </div>

            {/* 2. Main Page Headline */}
            <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '40px' }}>
                Home Services Details
            </h1>

            <div style={styles.mainLayout}>
                {/* --- LEFT SIDE: Main Info --- */}
                <div>
                    {service.images && service.images.length > 0 ? (
                        <img src={service.images[0]} alt={service.title} style={{ ...styles.mainImage, objectFit: 'cover' as const }} />
                    ) : (
                        <div style={styles.mainImage}>🏞️</div>
                    )}

                    {/* Vetting Guarantee Bar - As discussed and from photo */}
                    <div style={styles.qualityBar}>
                        <HiOutlineCheckBadge size={20} />
                        Each service is vetted for professional excellence and customer satisfaction.
                    </div>

                    <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '10px' }}>
                        {service.title}
                    </h2>
                    <p style={{ color: softGrey, fontSize: '14px', marginBottom: '30px' }}>
                        {service.category}
                    </p>

                    <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>
                        Description
                    </h3>
                    <div style={styles.description}>
                        <p style={{ marginBottom: '15px' }}>
                            {service.description}
                        </p>
                    </div>
                </div>

                {/* --- RIGHT SIDE: Floating Book Card --- */}
                <aside style={styles.bookCard}>
                    <div style={styles.priceBlock}>
                        <span>$</span>
                        <span>{service.price}</span>
                        <span style={{ fontSize: '16px', fontWeight: '500', color: softGrey }}> / session</span>
                    </div>
                    <p style={{ color: '#10B981', fontWeight: '600', fontSize: '14px', marginBottom: '25px' }}>
                        Available starting today
                    </p>

                    <div style={styles.infoRow}>
                        <HiOutlineUserCircle size={20} style={{ color: plutoBlue }} />
                        Provided by: <span style={{ fontWeight: '600', color: darkText }}>Nordic Expert</span>
                    </div>
                    <div style={styles.infoRow}>
                        <HiOutlineClock size={20} style={{ color: plutoBlue }} />
                        Duration: <span style={{ fontWeight: '600', color: darkText }}>{service.duration}</span>
                    </div>
                    <div style={styles.infoRow}>
                        <HiOutlineCurrencyDollar size={20} style={{ color: plutoBlue }} />
                        Materials Included: <span style={{ fontWeight: '600', color: darkText }}>Yes</span>
                    </div>

                    <button
                        style={styles.bookBtn}
                        onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
                        onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                    >
                        Book Service <span>→</span>
                    </button>
                    <div style={{ textAlign: 'center', marginTop: '15px', fontSize: '12px', color: softGrey }}>
                        100% Satisfaction Guaranteed
                    </div>
                </aside>
            </div>

            {/* --- 3. RECOMMENDATIONS SECTION (Bottom) --- */}
            <div style={styles.recommendations}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: '800' }}>
                        Recommended Services Based on Your EyesOn
                    </h2>
                    {/* View All TQ - Link back to Home Services Page */}
                    <div style={{ ...styles.backLink, marginBottom: 0, fontWeight: '600', color: plutoBlue }} onClick={() => navigate('/services')}>
                        View All TQ <span>→</span>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
                    {/* Recommendation 1 */}
                    <div style={styles.recCard}>
                        <div style={styles.miniImage}></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                            <h4 style={{ margin: '0', fontSize: '16px', fontWeight: '700' }}>Linen Tailoring</h4>
                            <span style={{ fontSize: '14px', fontWeight: 'bold' }}>$90</span>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', fontSize: '12px', color: softGrey }}>
                            <HiOutlineUserCircle size={14} />By Ingrid S.
                        </div>
                    </div>

                    {/* Recommendation 2 */}
                    <div style={styles.recCard}>
                        <div style={styles.miniImage}></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                            <h4 style={{ margin: '0', fontSize: '16px', fontWeight: '700' }}>Pottery Session</h4>
                            <span style={{ fontSize: '14px', fontWeight: 'bold' }}>$110</span>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', fontSize: '12px', color: softGrey }}>
                            <HiOutlineUserCircle size={14} />By Lars J.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetailPage;