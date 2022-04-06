<template>
  <div class="wrapper">
    <ul>
      <li>xxxx1</li>
      <li>xxxx2</li>
      <li>xxxx3</li>
      <li>xxxx4</li>
      <li>xxxx5</li>
      <li>xxxx6</li>
      <li>xxxx7</li>
      <li>xxxx8</li>
      <li>xxxx9</li>
      <li>xxxx10</li>
      <li>xxxx11</li>
      <li>xxxx12</li>
      <li>xxxx13</li>
      <li>xxxx14</li>
      <li>xxxx15</li>
      <li>xxxx16</li>
      <li>xxxx17</li>
      <li>xxxx18</li>
      <li>xxxx19</li>
      <li>xxxx20</li>
      <li>xxxx21</li>
      <li>xxxx22</li>
      <li>xxxx23</li>
      <li>xxxx24</li>
      <li>xxxx25</li>
      <li>xxxx26</li>
      <li>xxxx27</li>
      <li>xxxx28</li>
      <li>xxxx29</li>
      <li>xxxx30</li>
      <li>xxxx31</li>
      <li>xxxx32</li>
      <li>xxxx33</li>
      <li>xxxx34</li>
      <li>xxxx35</li>
      <li>xxxx36</li>
      <li>xxxx37</li>
      <li>xxxx38</li>
      <li>xxxx39</li>
      <li>xxxx40</li>
      <li>xxxx41</li>
      <li>xxxx42</li>
      <li>xxxx43</li>
      <li>xxxx44</li>
      <li>xxxx45</li>
      <li>xxxx46</li>
      <li>xxxx47</li>
      <li>xxxx48</li>
      <li>xxxx49</li>
      <li>xxxx50</li>
      <li>xxxx51</li>
      <li>xxxx52</li>
      <li>xxxx53</li>
      <li>xxxx54</li>
      <li>xxxx55</li>
      <li>xxxx56</li>
      <li>xxxx57</li>
      <li>xxxx58</li>
      <li>xxxx59</li>
      <li>xxxx60</li>
      <li>xxxx61</li>
      <li>xxxx62</li>
      <li>xxxx63</li>
      <li>xxxx64</li>
      <li>xxxx65</li>
      <li>xxxx66</li>
      <li>xxxx67</li>
      <li>xxxx68</li>
      <li>xxxx69</li>
      <li>xxxx70</li>
      <li>xxxx71</li>
      <li>xxxx72</li>
      <li>xxxx73</li>
      <li>xxxx74</li>
      <li>xxxx75</li>
      <li>xxxx76</li>
      <li>xxxx77</li>
      <li>xxxx78</li>
      <li>xxxx79</li>
      <li>xxxx80</li>
      <li>xxxx81</li>
      <li>xxxx82</li>
      <li>xxxx83</li>
      <li>xxxx84</li>
      <li>xxxx85</li>
      <li>xxxx86</li>
      <li>xxxx87</li>
      <li>xxxx88</li>
      <li>xxxx89</li>
      <li>xxxx90</li>
      <li>xxxx91</li>
      <li>xxxx92</li>
      <li>xxxx93</li>
      <li>xxxx94</li>
      <li>xxxx95</li>
      <li>xxxx96</li>
      <li>xxxx97</li>
      <li>xxxx98</li>
      <li>xxxx99</li>
      <li>xxxx100</li>
    </ul>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'

BScroll.use(Pullup)

export default {
  name: 'vue-Category',
  mounted() {
    const bs = new BScroll('.wrapper', {
      probeType: 3,
      pullUpLoad: true
    })
    // bs.on('scroll', (position) => console.log(position))
    bs.on('pullingUp', () => {
      console.log('上拉加载更多')
    })
  }
}
</script>

<style scoped>
.wrapper {
  height: 400px;
  background-color: pink;

  overflow: hidden;
  /* overflow-y: scroll; */
}
</style>
