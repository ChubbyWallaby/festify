'use client';

import { useState, useTransition } from 'react';
import { 
  QuestionnaireState, initialQuestionnaireState, calculateBudget 
} from '@/lib/pricing/engine';
import { 
  LocationType, TierType, GuestCountRange, VenueSetting, TentType, 
  FlowerType, ServiceType 
} from '@/lib/data/mockPricing';
import ReviewChart from './ReviewChart';
import { submitLeadAction } from '@/app/actions/submit-lead';

export default function CalculatorForm({ dict }: { dict: any }) {
  const STEPS = [
    { id: 1, title: dict.steps?.step1 || "Step 1" },
    { id: 2, title: dict.steps?.step2 || "Step 2" },
    { id: 3, title: dict.steps?.step3 || "Step 3" },
    { id: 4, title: dict.steps?.step4 || "Step 4" },
    { id: 5, title: dict.steps?.step5 || "Step 5" },
    { id: 6, title: dict.steps?.step6 || "Step 6" },
    { id: 7, title: dict.steps?.step7 || "Step 7" },
  ];

  const [currentStep, setCurrentStep] = useState(1);
  const [state, setState] = useState<QuestionnaireState>(initialQuestionnaireState);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);

  const updateState = (updates: Partial<QuestionnaireState>) => {
    setState(prev => ({ ...prev, ...updates }));
    setError(null);
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!state.location || !state.guestCount || !state.tier) {
        setError(dict.errors.step1);
        return;
      }
    } else if (currentStep === 2) {
      if (state.hasVenue === null) {
        setError(dict.errors.step2_hasVenue);
        return;
      }
      if (state.hasVenue === false && !state.venueSetting) {
        setError(dict.errors.step2_venueSetting);
        return;
      }
      if (state.hasVenue === false && state.needsTent === null) {
        setError(dict.errors.step2_needsTent);
        return;
      }
      if (state.hasVenue === false && state.needsTent && !state.tentType) {
        setError(dict.errors.step2_tentType);
        return;
      }
    } else if (currentStep === 3) {
      if (state.cocktailFurniture === null || state.diningPartyFurniture === null) {
        setError(dict.errors.step3);
        return;
      }
    } else if (currentStep === 4) {
      if (state.needsFlowers === null) {
        setError(dict.errors.step4_needsFlowers);
        return;
      }
      if (state.needsFlowers && state.flowerTypes.length === 0) {
        setError(dict.errors.step4_flowerTypes);
        return;
      }
    } else if (currentStep === 5) {
      if (state.needsCatering === null || state.needsLighting === null) {
        setError(dict.errors.step5);
        return;
      }
    }
    setError(null);
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setError(null);
    setCurrentStep(prev => prev - 1);
  };

  const toggleArrayItem = <T,>(arr: T[], item: T): T[] => 
    arr.includes(item) ? arr.filter(i => i !== item) : [...arr, item];

  return (
    <div style={{ width: '100%' }}>
      {/* Stepper Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-8)', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '12px', left: 0, right: 0, height: '2px', background: 'var(--color-border-soft)', zIndex: 0 }} />
        <div style={{ position: 'absolute', top: '12px', left: 0, height: '2px', background: 'var(--color-primary)', zIndex: 1, width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%`, transition: 'width var(--transition-smooth)' }} />
        
        {STEPS.map(step => (
          <div key={step.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
            <div style={{ 
              width: '24px', height: '24px', borderRadius: '50%', 
              background: currentStep >= step.id ? 'var(--color-primary)' : 'var(--color-white)',
              border: `2px solid ${currentStep >= step.id ? 'var(--color-primary)' : 'var(--color-border)'}`,
              color: currentStep >= step.id ? 'var(--color-white)' : 'var(--color-muted)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'var(--text-xs)', fontWeight: 600,
              transition: 'all var(--transition-smooth)'
            }}>
              {step.id}
            </div>
            <span style={{ fontSize: '10px', marginTop: 'var(--space-2)', color: currentStep >= step.id ? 'var(--color-dark)' : 'var(--color-muted)', fontWeight: currentStep === step.id ? 600 : 400 }}>
              {step.title}
            </span>
          </div>
        ))}
      </div>

      <div className="glass-card" style={{ padding: 'var(--space-8)' }}>
        {error && (
          <div style={{ background: 'hsl(347 70% 94%)', color: 'hsl(347 77% 38%)', padding: 'var(--space-3)', borderRadius: 'var(--radius-sm)', marginBottom: 'var(--space-6)', fontSize: 'var(--text-sm)', fontWeight: 500 }}>
            {error}
          </div>
        )}

        {/* Step 1 */}
        {currentStep === 1 && (
          <div className="animate-fade-in-up">
            <h2 style={{ marginBottom: 'var(--space-6)' }}>{dict.step1_title}</h2>
            
            <label className="label">{dict.locationLabel}</label>
            <select className="input" style={{ marginBottom: 'var(--space-6)' }} value={state.location || ''} onChange={(e) => updateState({ location: e.target.value as LocationType })}>
              <option value="" disabled>{dict.locationPlaceholder}</option>
              {['North', 'Center', 'Lisbon', 'Alentejo', 'Algarve'].map(loc => <option key={loc} value={loc}>{loc}</option>)}
            </select>

            <label className="label">{dict.tierLabel}</label>
            <select className="input" style={{ marginBottom: 'var(--space-6)' }} value={state.tier} onChange={(e) => updateState({ tier: e.target.value as TierType })}>
              <option value="standard">{dict.tierStandard}</option>
              <option value="premium">{dict.tierPremium}</option>
              <option value="luxury">{dict.tierLuxury}</option>
            </select>

            <label className="label">{dict.guestLabel}</label>
            <select className="input" style={{ marginBottom: 'var(--space-6)' }} value={state.guestCount || ''} onChange={(e) => updateState({ guestCount: e.target.value as GuestCountRange })}>
              <option value="" disabled>{dict.guestPlaceholder}</option>
              {['50-100', '100-150', '150-200', '200-250', '250', '300', 'more than 300'].map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
        )}

        {/* Step 2 */}
        {currentStep === 2 && (
          <div className="animate-fade-in-up">
            <h2 style={{ marginBottom: 'var(--space-6)' }}>{dict.step2_title}</h2>
            
            <label className="label">{dict.hasVenueLabel}</label>
            <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
              <button className={`btn ${state.hasVenue === true ? 'btn-primary' : 'btn-outline'}`} onClick={() => updateState({ hasVenue: true })}>{dict.yes}</button>
              <button className={`btn ${state.hasVenue === false ? 'btn-primary' : 'btn-outline'}`} onClick={() => updateState({ hasVenue: false })}>{dict.noVenue}</button>
            </div>

            {state.hasVenue === false && (
              <div className="animate-fade-in-up">
                <label className="label">{dict.venueSettingLabel}</label>
                <select className="input" style={{ marginBottom: 'var(--space-6)' }} value={state.venueSetting || ''} onChange={(e) => updateState({ venueSetting: e.target.value as VenueSetting })}>
                  <option value="" disabled>{dict.venueSettingPlaceholder}</option>
                  {['Country Place', 'Palace/Castle/Convent', 'Beach', 'City/Urban', 'Garden', 'Mountain/Highland', 'Resort/Hotel'].map(v => <option key={v} value={v}>{v}</option>)}
                </select>

                <label className="label">{dict.needsTentLabel}</label>
                <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
                  <button className={`btn ${state.needsTent === true ? 'btn-primary' : 'btn-outline'}`} onClick={() => updateState({ needsTent: true })}>{dict.yes}</button>
                  <button className={`btn ${state.needsTent === false ? 'btn-primary' : 'btn-outline'}`} onClick={() => updateState({ needsTent: false })}>{dict.no}</button>
                </div>

                {state.needsTent && (
                  <div className="animate-fade-in-up">
                    <label className="label">{dict.tentTypeLabel}</label>
                    <select className="input" style={{ marginBottom: 'var(--space-6)' }} value={state.tentType || ''} onChange={(e) => updateState({ tentType: e.target.value as TentType })}>
                      <option value="" disabled>{dict.tentTypePlaceholder}</option>
                      {['Tarki', '2-sided', 'Indian', 'other'].map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Step 3 */}
        {currentStep === 3 && (
          <div className="animate-fade-in-up">
            <h2 style={{ marginBottom: 'var(--space-6)' }}>{dict.step3_title}</h2>
            
            <label className="label">{dict.cocktailFurnLabel}</label>
            <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
              <button className={`btn ${state.cocktailFurniture === true ? 'btn-primary' : 'btn-outline'}`} onClick={() => updateState({ cocktailFurniture: true })}>{dict.yes}</button>
              <button className={`btn ${state.cocktailFurniture === false ? 'btn-primary' : 'btn-outline'}`} onClick={() => updateState({ cocktailFurniture: false })}>{dict.no}</button>
            </div>

            <label className="label">{dict.diningFurnLabel}</label>
            <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
              <button className={`btn ${state.diningPartyFurniture === true ? 'btn-primary' : 'btn-outline'}`} onClick={() => updateState({ diningPartyFurniture: true })}>{dict.yes}</button>
              <button className={`btn ${state.diningPartyFurniture === false ? 'btn-primary' : 'btn-outline'}`} onClick={() => updateState({ diningPartyFurniture: false })}>{dict.no}</button>
            </div>
          </div>
        )}

        {/* Step 4 */}
        {currentStep === 4 && (
          <div className="animate-fade-in-up">
            <h2 style={{ marginBottom: 'var(--space-6)' }}>{dict.step4_title}</h2>
            
            <label className="label">{dict.needsFlowersLabel}</label>
            <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
              <button className={`btn ${state.needsFlowers === true ? 'btn-primary' : 'btn-outline'}`} onClick={() => updateState({ needsFlowers: true })}>{dict.yes}</button>
              <button className={`btn ${state.needsFlowers === false ? 'btn-primary' : 'btn-outline'}`} onClick={() => updateState({ needsFlowers: false, flowerTypes: [] })}>{dict.no}</button>
            </div>

            {state.needsFlowers && (
              <div className="animate-fade-in-up">
                <label className="label">{dict.flowerTypesLabel}</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
                  {['Bouquet', 'Boutonnieres', 'Petal Basket', 'Sacrarium Arrangement', 'Altar Arrangement', 'Exterior Church Arrangement', 'Cocktail Area', 'Round Table Centerpieces', 'Rectangular Table Centerpieces', 'Buffets'].map((flower) => {
                    const isSelected = state.flowerTypes.includes(flower as FlowerType);
                    return (
                      <button 
                        key={flower}
                        className={`input text-left ${isSelected ? 'selected' : ''}`}
                        style={{ borderColor: isSelected ? 'var(--color-primary)' : 'var(--color-border)', background: isSelected ? 'hsl(35 38% 64% / 10%)' : 'transparent', cursor: 'pointer' }}
                        onClick={() => updateState({ flowerTypes: toggleArrayItem(state.flowerTypes, flower as FlowerType) })}
                      >
                        {flower}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 5 */}
        {currentStep === 5 && (
          <div className="animate-fade-in-up">
            <h2 style={{ marginBottom: 'var(--space-6)' }}>{dict.step5_title}</h2>
            
            <label className="label">{dict.needsCateringLabel}</label>
            <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
              <button className={`btn ${state.needsCatering === true ? 'btn-primary' : 'btn-outline'}`} onClick={() => updateState({ needsCatering: true })}>{dict.yes}</button>
              <button className={`btn ${state.needsCatering === false ? 'btn-primary' : 'btn-outline'}`} onClick={() => updateState({ needsCatering: false })}>{dict.no}</button>
            </div>

            <label className="label">{dict.needsLightingLabel}</label>
            <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
              <button className={`btn ${state.needsLighting === true ? 'btn-primary' : 'btn-outline'}`} onClick={() => updateState({ needsLighting: true })}>{dict.yes}</button>
              <button className={`btn ${state.needsLighting === false ? 'btn-primary' : 'btn-outline'}`} onClick={() => updateState({ needsLighting: false })}>{dict.no}</button>
            </div>

            <label className="label">{dict.otherServicesLabel}</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
              {['Photographer', 'Videographer', 'DJ', 'Entertainment Service', 'Band', 'Designer/Graphic'].map((service) => {
                const isSelected = state.otherServices.includes(service as ServiceType);
                return (
                  <button 
                    key={service}
                    className={`input text-left ${isSelected ? 'selected' : ''}`}
                    style={{ borderColor: isSelected ? 'var(--color-primary)' : 'var(--color-border)', background: isSelected ? 'hsl(35 38% 64% / 10%)' : 'transparent', cursor: 'pointer' }}
                    onClick={() => updateState({ otherServices: toggleArrayItem(state.otherServices, service as ServiceType) })}
                  >
                    {service}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Step 6: Review */}
        {currentStep === 6 && (
          <div className="animate-fade-in-up">
            <h2 style={{ marginBottom: 'var(--space-2)' }}>{dict.step6_title}</h2>
            <p style={{ color: 'var(--color-muted)', marginBottom: 'var(--space-8)' }}>
              {dict.step6_subtitle.replace('{tier}', state.tier).replace('{location}', state.location)}
            </p>
            
            {(() => {
              const breakdown = calculateBudget(state);
              const chartData = [
                { label: 'Venue', value: breakdown.venue, color: 'hsl(216, 17%, 12%)' },
                { label: 'Tent', value: breakdown.tent, color: 'hsl(35, 38%, 64%)' },
                { label: 'Furniture', value: breakdown.furniture, color: 'hsl(99, 11%, 67%)' },
                { label: 'Flowers', value: breakdown.flowers, color: 'hsl(0, 34%, 74%)' },
                { label: 'Lighting', value: breakdown.lighting, color: 'hsl(38, 92%, 50%)' },
                { label: 'Catering', value: breakdown.catering, color: 'hsl(142, 72%, 29%)' },
                { label: 'Services', value: breakdown.services, color: 'hsl(216, 10%, 52%)' },
              ];

              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
                  <ReviewChart data={chartData} />
                  
                  <div style={{ borderTop: '1px solid var(--color-border-soft)', paddingTop: 'var(--space-6)', marginTop: 'var(--space-2)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>{dict.grandTotal}</span>
                      <span style={{ fontSize: 'var(--text-2xl)', fontFamily: 'var(--font-serif)', color: 'var(--color-primary)' }}>
                        €{breakdown.total.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button className="btn btn-primary btn-lg w-full justify-center" onClick={() => setCurrentStep(7)}>
                    {dict.getQuote} →
                  </button>
                </div>
              );
            })()}
          </div>
        )}

        {/* Step 7: User Info (Lead Collection) */}
        {currentStep === 7 && !isSuccess && (
          <div className="animate-fade-in-up">
            <h2 style={{ marginBottom: 'var(--space-2)' }}>{dict.step7_title}</h2>
            <p style={{ color: 'var(--color-muted)', marginBottom: 'var(--space-8)' }}>
              {dict.step7_subtitle}
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div>
                <label className="label">{dict.nameLabel}</label>
                <input 
                  type="text" 
                  className="input" 
                  value={state.clientInfo.name} 
                  onChange={e => updateState({ clientInfo: { ...state.clientInfo, name: e.target.value } })}
                  placeholder="Maria & João"
                />
              </div>
              <div>
                <label className="label">{dict.emailLabel}</label>
                <input 
                  type="email" 
                  className="input" 
                  value={state.clientInfo.email} 
                  onChange={e => updateState({ clientInfo: { ...state.clientInfo, email: e.target.value } })}
                  placeholder="hello@couple.com"
                />
              </div>
              <div>
                <label className="label">{dict.phoneLabel}</label>
                <input 
                  type="tel" 
                  className="input" 
                  value={state.clientInfo.phone} 
                  onChange={e => updateState({ clientInfo: { ...state.clientInfo, phone: e.target.value } })}
                  placeholder="+351 912 345 678"
                />
              </div>

              <button 
                className="btn btn-primary btn-lg w-full justify-center" 
                style={{ marginTop: 'var(--space-4)' }}
                disabled={isPending || !state.clientInfo.name || !state.clientInfo.email || !state.clientInfo.phone}
                onClick={() => {
                  startTransition(async () => {
                    const result = await submitLeadAction(state);
                    if (result.success) {
                      setIsSuccess(true);
                    } else {
                      setError(result.error || 'Failed to send email.');
                    }
                  });
                }}
              >
                {isPending ? dict.submitting : dict.submitQuote}
              </button>
            </div>
          </div>
        )}

        {/* Success State */}
        {isSuccess && (
          <div className="animate-fade-in-up text-center" style={{ padding: 'var(--space-8) 0' }}>
            <div style={{ fontSize: '48px', marginBottom: 'var(--space-4)' }}>✨</div>
            <h2 style={{ marginBottom: 'var(--space-2)' }}>{dict.successTitle}</h2>
            <p style={{ color: 'var(--color-muted)' }}>{dict.successMessage}</p>
          </div>
        )}

        {/* Footer Actions */}
        {!isSuccess && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-8)', borderTop: '1px solid var(--color-border-soft)', paddingTop: 'var(--space-6)' }}>
            {currentStep > 1 ? (
              <button className="btn btn-outline" onClick={handleBack} disabled={isPending}>{dict.back}</button>
            ) : <div />}
            
            {currentStep < 6 && (
               <button className="btn btn-primary" onClick={handleNext}>{dict.next}</button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
