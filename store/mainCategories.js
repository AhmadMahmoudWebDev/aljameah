export const state = () => ({
  isInstalled: false,
  items: [
    // Keep The Order
    {
      color: '#BF360C',
      icon: 'fas fa-newspaper',
      iconColor: '#FFAB91',
      title: 'أخبار الجمعية',
      description: 'آخر أخبار الجمعية و نشاطاتها.',
      link: '/latest news'
    },
    {
      color: '#212121',
      icon: 'far fa-bookmark',
      iconColor: '#616161',
      title: 'الوفيات',
      description: 'آخر الوفيات الذين سيتم دفنهم في المقابر التي تشرف عليها الجمعية.',
      link: '/occasions'
    },
    {
      color: '#006064',
      icon: 'fas fa-briefcase-medical',
      iconColor: '#B2EBF2',
      title: 'الأجهزة الطبية',
      description: 'الأجهزة الطبية المتوفرة لدى الجمعية التي تقدمها للأعضاء في الحالات المرضية.',
      link: '/medical Eq'
    },
    {
      color: '#880E4F',
      icon: 'fas fa-hands-helping',
      iconColor: '#EC407A',
      title: 'عن الجمعية',
      description: 'أهداف الجمعية، الإدارة، المندوبين',
      link: '/about'
    }
  ]
}
)

export const mutations = {
  installed (state) {
    state.isInstalled = true
  }
}
